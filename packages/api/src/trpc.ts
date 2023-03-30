import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
import { clerkClient } from "@clerk/nextjs/server";
import superjson from "superjson";
import { prisma } from "@acme/db";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  const id = ctx.auth.userId;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    const userInfo = await clerkClient.users.getUser(ctx.auth.userId);

    const { username, profileImageUrl } = userInfo;

    await ctx.prisma.user.create({
      data: {
        id,
        profileImageUrl:
          profileImageUrl ||
          "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
        username: username || "Chores user",
      },
    });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

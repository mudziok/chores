import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const householdRouter = router({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      while (true) {
        const inviteCode = Math.random()
          .toString(36)
          .substring(3, 8)
          .toUpperCase();

        const taken = await ctx.prisma.household.findUnique({
          where: { inviteCode },
        });

        if (!taken) {
          return ctx.prisma.household.create({
            data: {
              name,
              inviteCode,
              members: { connect: [{ id: ctx.auth.userId }] },
            },
          });
        }
      }
    }),
  inviteCode: protectedProcedure.query(async ({ ctx }) => {
    const { auth, prisma } = ctx;
    const { userId: id } = auth;

    const household = await prisma.household.findFirst({
      where: { members: { some: { id } } },
    });

    return { code: household?.inviteCode || "ERROR" };
  }),
  joinHousehold: protectedProcedure
    .input(z.object({ inviteCode: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { auth, prisma } = ctx;
      const { userId: id } = auth;
      const { inviteCode } = input;

      try {
        const { household } = await prisma.user.update({
          where: { id },
          data: { household: { connect: { inviteCode } } },
          include: { household: true },
        });

        return { household: household! };
      } catch {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Couldn't find household",
        });
      }
    }),
});

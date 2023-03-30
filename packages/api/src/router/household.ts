import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const householdRouter = router({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return {};
    }),
  inviteCode: protectedProcedure.query(async ({ ctx }) => {
    const { auth, prisma } = ctx;
    const { userId: id } = auth;

    const household = await prisma.household.findFirst({
      where: { members: { some: { id } } },
    });

    return { code: household?.inviteCode || "ERROR" };
  }),
  refreshCode: protectedProcedure.mutation(({ ctx }) => {
    return {};
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

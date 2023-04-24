import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { startOfDay, getDay, isSameDay } from "date-fns";

export const choreRouter = router({
  all: protectedProcedure
    .input(z.object({ day: z.date() }))
    .query(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { userId } = auth;
      const { day } = input;

      const now = startOfDay(day);

      let { householdId } = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { householdId: true },
      });

      householdId = householdId || "ERROR";

      const choreSlots = await prisma.choreSlot.findMany({
        where: { repeatDay: getDay(now), householdId },
        include: {
          chores: {
            where: { expectedDate: { lte: now } },
            take: 1,
            orderBy: { expectedDate: "desc" },
          },
        },
      });

      const upcomingChores = await Promise.all(
        choreSlots.map((slot) => {
          const chore = slot.chores[0];
          if (chore && isSameDay(chore.expectedDate, day)) {
            return {
              ...chore,
              slot,
            };
          }
          return prisma.chore.create({
            data: { expectedDate: now, slotId: slot.id },
            include: {
              slot: true,
            },
          });
        }),
      );

      const oneOffChores = await prisma.chore.findMany({
        where: {
          expectedDate: now,
          slot: { repeatDay: null, householdId },
        },
        include: {
          slot: true,
        },
      });

      let chores = [...upcomingChores, ...oneOffChores];

      if (isSameDay(now, new Date())) {
        const pastChores = await prisma.chore.findMany({
          where: {
            expectedDate: { lt: now },
            slot: { householdId },
            OR: [{ completedBy: null }, { completedDate: now }],
          },
          include: {
            slot: true,
          },
        });

        chores = [...chores, ...pastChores];
      }

      return {
        chores,
        stats: {
          all: chores.length,
          done: chores.filter(({ completedById }) => completedById).length,
        },
      };
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.string(), day: z.date() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, day } = input;
      const now = startOfDay(day);

      const chore = await prisma.chore.findUnique({
        where: { id },
        include: {
          slot: {
            include: {
              chores: {
                where: { expectedDate: { lte: now } },
                include: { completedBy: true },
                take: 5,
                orderBy: { expectedDate: "desc" },
              },
            },
          },
        },
      });

      return chore;
    }),
  changeStatus: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { userId } = auth;
      const { id, done } = input;

      const now = startOfDay(new Date());

      if (done) {
        return prisma.chore.update({
          where: { id },
          data: {
            completedBy: { connect: { id: userId } },
            completedDate: now,
          },
        });
      } else {
        return prisma.chore.update({
          where: { id },
          data: { completedBy: { disconnect: true }, completedDate: null },
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        repeatDay: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, auth } = ctx;
      const { userId } = auth;
      const { title, description, repeatDay } = input;
      const now = startOfDay(new Date());

      const { householdId } = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { householdId: true },
      });

      if (repeatDay) {
        return prisma.choreSlot.create({
          data: {
            title,
            description,
            startDate: now,
            repeatDay,
            householdId: householdId || "ERROR",
          },
        });
      }

      return prisma.choreSlot.create({
        data: {
          title,
          description,
          startDate: now,
          chores: { create: [{ expectedDate: now }] },
          householdId: householdId || "ERROR",
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      return prisma.choreSlot.delete({ where: { id } });
    }),
});

import { router } from "../trpc";
import { choreRouter } from "./chore";
import { authRouter } from "./auth";
import { householdRouter } from "./household";

export const appRouter = router({
  chore: choreRouter,
  auth: authRouter,
  household: householdRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

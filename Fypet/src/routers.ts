import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";
import { sendEmail, generateVerificationEmailHTML } from "./email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    verifyEmail: publicProcedure
      .input(z.object({ token: z.string() }))
      .mutation(async ({ input }) => {
        const verificationToken = await db.getEmailVerificationToken(input.token);
        
        if (!verificationToken) {
          throw new Error("Token de verificacao invalido ou expirado");
        }

        if (new Date() > verificationToken.expiresAt) {
          await db.deleteEmailVerificationToken(input.token);
          throw new Error("Token de verificacao expirado");
        }

        await db.verifyUserEmail(verificationToken.userId);
        await db.deleteEmailVerificationToken(input.token);

        return { success: true };
      }),
  }),

  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProfile(ctx.user.id);
    }),
    update: protectedProcedure
      .input(z.object({
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        bio: z.string().optional(),
        photoUrl: z.string().optional(),
        userType: z.enum(["individual", "ong"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  animals: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAvailableAnimals(50);
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getAnimalById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        species: z.string(),
        breed: z.string().optional(),
        age: z.string().optional(),
        description: z.string().optional(),
        photoUrls: z.string().optional(),
        location: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        status: z.enum(["available", "adopted", "pending"]).optional(),
        contactName: z.string().optional(),
        contactPhone: z.string().optional(),
        contactEmail: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.createAnimal({
          ...input,
          userId: ctx.user.id,
        });
        return result;
      }),
    getByUser: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAnimalsByUser(ctx.user.id);
    }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        species: z.string().optional(),
        breed: z.string().optional(),
        age: z.string().optional(),
        description: z.string().optional(),
        photoUrls: z.string().optional(),
        location: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        status: z.enum(["available", "adopted", "pending"]).optional(),
        contactName: z.string().optional(),
        contactPhone: z.string().optional(),
        contactEmail: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const animal = await db.getAnimalById(input.id);
        if (!animal || animal.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }
        const { id, ...updates } = input;
        await db.updateAnimal(id, updates);
        return { success: true };
      }),
  }),

  lostPets: router({
    getAll: publicProcedure.query(async () => {
      return await db.getLostPets();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getLostPetById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        species: z.string(),
        breed: z.string().optional(),
        color: z.string().optional(),
        description: z.string().optional(),
        photoUrls: z.string().optional(),
        lostLocation: z.string(),
        city: z.string(),
        state: z.string(),
        lostDate: z.string(),
        status: z.enum(["lost", "found", "returned"]).optional(),
        contactName: z.string(),
        contactPhone: z.string(),
        contactEmail: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.createLostPet({
          ...input,
          userId: ctx.user.id,
          lostDate: new Date(input.lostDate),
        });
        return result;
      }),
    getByUser: protectedProcedure.query(async ({ ctx }) => {
      return await db.getLostPetsByUser(ctx.user.id);
    }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["lost", "found", "returned"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const lostPet = await db.getLostPetById(input.id);
        if (!lostPet || lostPet.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }
        const { id, ...updates } = input;
        await db.updateLostPet(id, updates);
        return { success: true };
      }),
  }),

  upload: router({
    file: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(),
        contentType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const fileKey = `users/${ctx.user.id}/uploads/${Date.now()}-${input.fileName}`;
        const buffer = Buffer.from(input.fileData, "base64");
        const result = await storagePut(fileKey, buffer, input.contentType);
        return result;
      }),
  }),

  favorites: router({
    add: protectedProcedure
      .input(z.object({ animalId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.addFavorite(ctx.user.id, input.animalId);
        return { success: true };
      }),
    remove: protectedProcedure
      .input(z.object({ animalId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.removeFavorite(ctx.user.id, input.animalId);
        return { success: true };
      }),
    isFavorite: protectedProcedure
      .input(z.object({ animalId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.isFavorite(ctx.user.id, input.animalId);
      }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getFavoritesByUser(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;

import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userProfiles, InsertUserProfile, animals, InsertAnimal, lostPets, InsertLostPet, emailVerificationTokens, InsertEmailVerificationToken, favorites, InsertFavorite } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// User Profile queries
export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertUserProfile(userId: number, profile: Partial<InsertUserProfile>) {
  const db = await getDb();
  if (!db) return;

  const existing = await getUserProfile(userId);
  if (existing) {
    await db.update(userProfiles).set({ ...profile, updatedAt: new Date() }).where(eq(userProfiles.userId, userId));
  } else {
    await db.insert(userProfiles).values({ userId, ...profile });
  }
}

// Animal queries
export async function createAnimal(animal: InsertAnimal) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(animals).values(animal);
  return result;
}

export async function getAnimalById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(animals).where(eq(animals.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAvailableAnimals(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(animals).where(eq(animals.status, "available")).orderBy(desc(animals.createdAt)).limit(limit);
}

export async function getAnimalsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(animals).where(eq(animals.userId, userId)).orderBy(desc(animals.createdAt));
}

export async function updateAnimal(id: number, updates: Partial<InsertAnimal>) {
  const db = await getDb();
  if (!db) return;

  await db.update(animals).set({ ...updates, updatedAt: new Date() }).where(eq(animals.id, id));
}

// Lost Pet queries
export async function createLostPet(lostPet: InsertLostPet) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(lostPets).values(lostPet);
  return result;
}

export async function getLostPetById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(lostPets).where(eq(lostPets.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getLostPets(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(lostPets).where(eq(lostPets.status, "lost")).orderBy(desc(lostPets.createdAt)).limit(limit);
}

export async function getLostPetsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(lostPets).where(eq(lostPets.userId, userId)).orderBy(desc(lostPets.createdAt));
}

export async function updateLostPet(id: number, updates: Partial<InsertLostPet>) {
  const db = await getDb();
  if (!db) return;

  await db.update(lostPets).set({ ...updates, updatedAt: new Date() }).where(eq(lostPets.id, id));
}

// Email Verification queries
export async function createEmailVerificationToken(token: InsertEmailVerificationToken) {
  const db = await getDb();
  if (!db) return undefined;

  return await db.insert(emailVerificationTokens).values(token);
}

export async function getEmailVerificationToken(token: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(emailVerificationTokens).where(eq(emailVerificationTokens.token, token)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function deleteEmailVerificationToken(token: string) {
  const db = await getDb();
  if (!db) return;

  await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));
}

export async function verifyUserEmail(userId: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(users).set({ emailVerified: true, updatedAt: new Date() }).where(eq(users.id, userId));
}

export async function deleteExpiredVerificationTokens() {
  const db = await getDb();
  if (!db) return;

  await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.expiresAt, new Date()));
}

// Favorites queries
export async function addFavorite(userId: number, animalId: number) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.insert(favorites).values({ userId, animalId });
    return result;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return undefined;
  }
}

export async function removeFavorite(userId: number, animalId: number) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.delete(favorites).where(
      and(eq(favorites.userId, userId), eq(favorites.animalId, animalId))
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

export async function isFavorite(userId: number, animalId: number) {
  const db = await getDb();
  if (!db) return false;

  try {
    const result = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.animalId, animalId)))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
}

export async function getFavoritesByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(favorites)
      .innerJoin(animals, eq(favorites.animalId, animals.id))
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

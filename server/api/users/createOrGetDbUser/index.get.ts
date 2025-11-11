import { clerkClient } from "@clerk/nuxt/server";
import {db} from '~~/libs/db';
import {usersTable} from '~~/db/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async(event) => {
    const { isAuthenticated, userId } = event.context.auth()

  // Protect the API route by checking if the user is signed in
  if (!isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No user ID provided',
    })
  }

  // Get the user's full `Backend User` object
  try {
    const user = await clerkClient(event).users.getUser(userId);

    let dbUser = await db.select().from(usersTable).where(eq(usersTable.clerkId, user.id));

  if(!dbUser[0]) {
    dbUser = await db.insert(usersTable).values({
        userName: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        clerkId: user.id
      }).returning();
  }

  

  return dbUser[0];
  } catch (error: any) {
    return error.message;
  }
  
});
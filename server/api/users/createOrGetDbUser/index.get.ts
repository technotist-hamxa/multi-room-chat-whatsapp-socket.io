import { clerkClient } from "@clerk/nuxt/server";
import db from '~~/libs/db';

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
  const user = await clerkClient(event).users.getUser(userId);

  try {
    let dbUser = await db.user.findUnique({
    where: {
      clerkId: user.id
    }
  });

  if(!dbUser) {
    dbUser = await db.user.create({
      data: {
        userName: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        clerkId: user.id
      }
    });
  }

  return dbUser;
  } catch (error: any) {
    console.log(error.message, 'iam the error');

    return error.message;
  }
});
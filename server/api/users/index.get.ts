import db from "~~/libs/db";

export default defineEventHandler(async(event) => {
    const { isAuthenticated, userId } = event.context.auth()

  // Protect the API route by checking if the user is signed in
  if (!isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No user ID provided',
    })
  }
    const users = await db.user.findMany();

    return users;
});
import { messageTable } from "~~/db/schema";
import { db } from "~~/libs/db";

export default defineEventHandler(async (event) => {
  const { isAuthenticated, userId } = event.context.auth();
  // const query = getQuery(event);
  const data = await readBody(event);

  if (!isAuthenticated) {
    throw createError({
      message: "SORRY YOU ARE UNAUTHENTICATED",
      status: 403,
    });
  }
  console.log('congradulations the socket.io is completely replaced by pusher');

  const message = await db
    .insert(messageTable)
    .values({
      senderId: data.senderId as string,
      receiverId: data.receiverId as string,
      message: data.message,
    })
    .returning();

  pusherServer.trigger(data.room, "sendMessage", {
    msg: message[0],
  });

  return { isSuccess: true };
});

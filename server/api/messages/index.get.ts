import { and, eq, or } from "drizzle-orm";
import { messageTable, usersTable } from "~~/db/schema";
import { db } from "~~/libs/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const senderId = query.senderId as string;
  const recieverId = query.recieverId as string;

  // const messages = await db.message.findMany({
  //     where: {
  //         OR: [
  //             {senderId, recieverId},
  //             {senderId: recieverId, recieverId: senderId}
  //         ]
  //     }
  // });

  const messages = await db
    .select()
    .from(messageTable)
    .where(
      or(
        and(
          eq(messageTable.senderId, senderId),
          eq(messageTable.receiverId, recieverId)
        ),
        and(
          eq(messageTable.senderId, recieverId),
          eq(messageTable.receiverId, senderId)
        )
      )
    );

  const transformedMessages = messages.map((m) => {
    const msg = {
      id: m.id,
      message: m.message,
      status: senderId === m.senderId ? "sent" : "recieved",
    };

    return msg;
  });

  return transformedMessages;
  } catch (error: any) {
    return error.message
  }
});

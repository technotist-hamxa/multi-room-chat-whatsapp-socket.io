import db from "~~/libs/db";

export default defineEventHandler(async(event) => {
    const query = getQuery(event);

    const senderId = query.senderId as string;
    const recieverId = query.recieverId as string;

    const messages = await db.message.findMany({
        where: {
            OR: [
                {senderId, recieverId},
                {senderId: recieverId, recieverId: senderId}
            ]
        }
    });

    const transformedMessages = messages.map((m) => {
        const msg = {id: m.id, message: m.message, status: senderId === m.senderId ? 'sent' : 'recieved'};

        return msg;
    });

    return transformedMessages;
});
import { getDB } from "../config/db.js";

export async function createUser(user) {
    const db = getDB();

    const result = await db
        .collection("users")
        .insertOne(user);

    return result;
}
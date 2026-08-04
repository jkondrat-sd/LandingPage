import clientPromiseMongo, { client } from "@/server/pkg/mongo_pkg";

const dbName = process.env.DB_MONGO;

const coll = async (col) => {
  try {
    const client = await clientPromiseMongo;
    const res = await client.db(dbName).collection(col);
    return res;
  } catch (error) {
    console.log("init mongo : ", error.message);
  }
};

export const createIndexUsers = async () => {
  try {
    const dbColl = await coll("users");
    const res = await dbColl.createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.log("createIndexUsers : ", error.message);
  }
};

export const findOne = async (col, query) => {
  try {
    let res;

    const dbColl = await coll(col);
    res = await dbColl.findOne(query);

    return { err: null, res };
  } catch (error) {
    console.error("findOne : ", error.message);
    return { err: error.message, res: null };
  }
};

export const insertOne = async (col, field) => {
  try {
    let res;

    const dbColl = await coll(col);
    res = await dbColl.insertOne(field);

    return { err: null, res };
  } catch (error) {
    console.error("insertOne : ", error.message);
    return { err: error.message, res: null };
  }
};

export const findAll = async (col, query) => {
  try {
    let cursor;
    let res = [];

    const dbColl = await coll(col);
    cursor = await dbColl.find(query);
    await cursor.forEach((d) => res.push(d));

    return res;
  } catch (error) {
    console.error("findAll : ", error.message);
    throw { message: error.message };
  }
};

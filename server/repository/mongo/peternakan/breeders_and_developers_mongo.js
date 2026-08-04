import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllBreedersAndDevelopers = async () => {
  try {
    const res = await findAll("breeders_and_developers", {});

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};

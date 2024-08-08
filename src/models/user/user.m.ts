import pool from "../../connect/db";

const getAllUserRegister = async (): Promise<false | any> => {
  const query = `SELECT email FROM public."user" WHERE accept = true`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log("Get all user register fail!", error);
    return false;
  }
};

const insertUser = async (
  email: string,
  accept: boolean
): Promise<false | any> => {
  const query = `INSERT INTO public."user" (email, accept) VALUES ('${email}', '${accept}')`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log("Insert user fail!", error);
    return false;
  }
};

const updateUser = async (
  email: string,
  accept: boolean,
  city?: string
): Promise<false | any> => {
  let query = `UPDATE public."user" SET accept = '${accept}' WHERE email = '${email}'`;
  if (city) {
    query = `UPDATE public."user" SET accept = '${accept}', city = '${city}' WHERE email = '${email}'`;
  }
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log("Update user fail!", error);
    return false;
  }
};

export { getAllUserRegister, insertUser, updateUser };

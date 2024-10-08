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
  accept: boolean,
  city?: string
): Promise<false | any> => {
  let query = `INSERT INTO public."user" (email, accept) VALUES ('${email}', '${accept}')`;
  if (city) {
    query = `INSERT INTO public."user" (email, accept, city) VALUES ('${email}', '${accept}', '${city}')`;
  }
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

const getCityUser = async (email: string): Promise<false | any> => {
  const query = `SELECT city FROM public."user" WHERE email = '${email}'`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log("Get city user fail!", error);
    return false;
  }
};

export { getAllUserRegister, insertUser, updateUser, getCityUser };

import pool from "../../connect/db";

let client: any = null;

try {
  client = pool.connect();
  console.log("client", client);
  console.log("User model connect database successfully!");
} catch (error: any) {
  console.log("User model connect database fail!");
}

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

export { getAllUserRegister };

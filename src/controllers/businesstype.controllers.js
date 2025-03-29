import { getConnection } from "../databases/connection.js";

export const getBusinessType = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM AdmTiposNegocio");
  res.json(result.recordset);
};
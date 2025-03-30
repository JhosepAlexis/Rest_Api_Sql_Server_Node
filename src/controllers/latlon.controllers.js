import { getConnection } from "../databases/connection.js";

export const getLatitudLongitud = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT Latitud, Longitud FROM AdmTerceros");
  res.json(result.recordset);
};
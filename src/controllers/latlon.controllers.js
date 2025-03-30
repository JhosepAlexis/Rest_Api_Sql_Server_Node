import { getConnection } from "../databases/connection.js";

export const getLatitudLongitud = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT Latitud, Longitud FROM AdmTerceros WHERE Latitud IS NOT NULL AND Longitud IS NOT NULL");
  res.json(result.recordset);
};
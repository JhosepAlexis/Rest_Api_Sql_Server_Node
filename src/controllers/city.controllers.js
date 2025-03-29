import { getConnection } from "../databases/connection.js";

export const getCity = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT CIU.CiudadID, CONCAT(CIU.CiudadNombre, ' - ',DEP.DepartamentoNombre) AS Ciudad FROM AdmCiudad CIU INNER JOIN AdmDepartamento DEP ON DEP.DepartamentoID=CIU.DepartamentoID ORDER BY CIU.CiudadNombre ASC");
  res.json(result.recordset);
};
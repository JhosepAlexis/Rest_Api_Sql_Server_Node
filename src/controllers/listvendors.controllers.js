import { getConnection } from "../databases/connection.js";


export const getVendorsList = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT VendedorID, VendedorCodigo, VendedorNombre, Cedula FROM AdmVendedor WHERE Activo=0");
  res.json(result.recordset);
};
import { getConnection } from "../databases/connection.js";
import sql from "mssql";


export const getCustomerListSeller = async (req, res) => {
  const { VendedorID } = req.body;
  const pool = await getConnection();
  const result = await pool
  .request()
  .input('VendedorID', sql.Int, VendedorID)
  .query("SELECT TercerosIdentificacion, TercerosNombres, TercerosDireccion, 'home' as type, Latitud, Longitud FROM AdmTerceros WHERE VendedorID=@VendedorID AND Latitud IS NOT NULL AND Longitud IS NOT NULL");
  res.json(result.recordset);
};
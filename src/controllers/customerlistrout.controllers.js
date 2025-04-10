import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const getCustomerListRout = async (req, res) => {
  const { VendedorID, Dia } = req.body;
  const pool = await getConnection();
  const result = await pool.request()
  .input('VendedorID', sql.Int, VendedorID)
  .input('Dia', sql.NVarChar, Dia)
  .query("SELECT RUT.Cedula, RUT.TercerosNombres, RUT.Direccion, 'home' as type, TER.Latitud, TER.Longitud FROM RuteroVendedores RUT INNER JOIN AdmTerceros TER ON TER.TercerosID=RUT.TercerosID WHERE RUT.VendedorID=@VendedorID AND RUT.Dia=@Dia");
  res.json(result.recordset);
};
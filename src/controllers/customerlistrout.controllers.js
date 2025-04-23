import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const getCustomerListRout = async (req, res) => {
  const { VendedorID, Dia } = req.body;
  const pool = await getConnection();
  const result = await pool.request()
  .input('VendedorID', sql.Int, VendedorID)
  .input('Dia', sql.NVarChar, Dia)
  .query(`
    SELECT 
      RUT.TercerosID,
      RUT.Cedula,
      RUT.TercerosNombres, 
      RUT.Direccion, 
      'home' as type, 
      TER.Latitud, 
      TER.Longitud,
      COALESCE(
          (SELECT TOP 1 'VENTA' 
           FROM InvNo_Venta_Pedidos 
           WHERE TercerosID = RUT.TercerosID 
           AND CONVERT(DATE, Fecha) = CONVERT(DATE, GETDATE())
           AND Detalle = ''),
          (SELECT TOP 1 'NO-VENTA' 
           FROM InvNo_Venta_Pedidos 
           WHERE TercerosID = RUT.TercerosID 
           AND CONVERT(DATE, Fecha) = CONVERT(DATE, GETDATE())
           AND Detalle <> ''),
          'PENDIENTE'
      ) AS Estado
    FROM 
      RuteroVendedores RUT INNER JOIN 
      AdmTerceros TER ON TER.TercerosID=RUT.TercerosID 
    WHERE 
      RUT.VendedorID=@VendedorID AND RUT.Dia=@Dia
    `
  );
  res.json(result.recordset);
};
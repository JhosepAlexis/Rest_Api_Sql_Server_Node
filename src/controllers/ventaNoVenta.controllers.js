import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const createVenta = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("VendedorID", sql.Int, req.body.VendedorID)
    .input("TercerosID", sql.Int, req.body.TercerosID)
    .input("Fecha", sql.Date, req.body.Fecha)
    .input("Hora", sql.Time, req.body.Hora)
    .input("Latitud", sql.Float, req.body.Latitud)
    .input("Longitud", sql.Float, req.body.Longitud)
    .query(
      "INSERT INTO InvNo_Venta_Pedidos (VendedorID,TercerosID,Fecha,Detalle,Hora,Longitud,Latitud,Sucursales) VALUES(@VendedorID,@TercerosID,@Fecha,'',@Hora,@Longitud,@Latitud,0); SELECT SCOPE_IDENTITY() AS ID;"
    );

  console.log(result);
  res.json({
    ID: result.recordset[0].ID,
    VendedorID: req.body.VendedorID,
    TercerosID: req.body.TercerosID,
    Fecha: req.body.Fecha,
  });
};

export const createNoVenta = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("VendedorID", sql.Int, req.body.VendedorID)
    .input("TercerosID", sql.Int, req.body.TercerosID)
    .input("Fecha", sql.Date, req.body.Fecha)
    .input("Detalle", sql.NVarChar, req.body.Detalle)
    .input("Hora", sql.Time, req.body.Hora)
    .input("Latitud", sql.Float, req.body.Latitud)
    .input("Longitud", sql.Float, req.body.Longitud)
    .query(
      "INSERT INTO InvNo_Venta_Pedidos (VendedorID,TercerosID,Fecha,Detalle,Hora,Longitud,Latitud,Sucursales) VALUES(@VendedorID,@TercerosID,@Fecha,@Detalle,@Hora,@Longitud,@Latitud,0); SELECT SCOPE_IDENTITY() AS ID;"
    );

  console.log(result);
  res.json({
    ID: result.recordset[0].ID,
    VendedorID: req.body.VendedorID,
    TercerosID: req.body.TercerosID,
    Fecha: req.body.Fecha,
  });
};
import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const createVenta = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    
    // Validar formato de hora (hhmm)
    if (!/^([01][0-9]|2[0-3])[0-5][0-9]$/.test(req.body.Hora)) {
      return res.status(400).json({ error: "Formato de hora inválido. Use hhmm" });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("VendedorID", sql.Int, req.body.VendedorID)
      .input("TercerosID", sql.Int, req.body.TercerosID)
      .input("Fecha", sql.Date, req.body.Fecha)
      .input("Hora", sql.NVarChar, req.body.Hora) // Tipo NVARCHAR
      .input("Latitud", sql.Float, req.body.Latitud || null)
      .input("Longitud", sql.Float, req.body.Longitud || null)
      .query(`
        INSERT INTO InvNo_Venta_Pedidos (
          VendedorID,
          TercerosID,
          Fecha,
          Detalle,
          Hora,
          Longitud,
          Latitud,
          Sucursales
        ) VALUES (
          @VendedorID,
          @TercerosID,
          @Fecha,
          '',
          @Hora,
          @Longitud,
          @Latitud,
          0
        );
        SELECT SCOPE_IDENTITY() AS ID;
      `);

    console.log("Resultado de inserción:", result.recordset);
    
    res.status(201).json({
      success: true,
      ID: result.recordset[0].ID,
      HoraRegistrada: req.body.Hora // Confirmación del formato enviado
    });

  } catch (error) {
    console.error("Error en createVenta:", error);
    res.status(500).json({ 
      error: "Error al registrar venta",
      detalles: error.message 
    });
  }
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
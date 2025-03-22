import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT TOP 2 * FROM AdmArticulos");
  res.json(result.recordset);
};

export const getProdut = async (req, res) => {
  console.log(req.params.ArticulosID);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ArticulosID", sql.Int, req.params.ArticulosID)
    .query("SELECT * FROM AdmArticulos WHERE ArticulosID=@ArticulosID");
  
    if (result.rowsAffected[0]===0){
        return res.status(404).json({message: "Product not found"});
    }

    return res.json(result.recordset[0])
};

export const createProduct = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ArticulosCodigo", sql.VarChar, req.body.ArticulosCodigo)
    .input("ArticulosNombre", sql.VarChar, req.body.ArticulosNombre)
    .input("LineasID", sql.Int, req.body.LineasID)
    .input("ArticulosUltmoCosto", sql.Money, req.body.ArticulosUltmoCosto)
    .input("ArticulosCosto", sql.Money, req.body.ArticulosCosto)
    .input("ArticulosVenta", sql.Money, req.body.ArticulosVenta)
    .input("GruposID", sql.Int, req.body.GruposID)
    .input("ArticulosFechaInicial", sql.Date, req.body.ArticulosFechaInicial)
    .input("ArticulosMarca", sql.VarChar, req.body.ArticulosMarca)
    .input("ArticulosReferencia", sql.VarChar, req.body.ArticulosReferencia)
    .query(
      "INSERT INTO AdmArticulos (ArticulosCodigo,ArticulosNombre,ArticulosTipo,LineasID,ArticulosUltmoCosto,ArticulosCosto,ArticulosVenta,GruposID,ArticulosManejaDecimal,ArticulosFechaInicial,BasesInventariosID,ArticulosEstado,ArticulosMarca,ArticulosReferencia,ArticulosPeso,ArticulosLote,Ipoconsumo) VALUES(@ArticulosCodigo,@ArticulosNombre,1,@LineasID,@ArticulosUltmoCosto,@ArticulosCosto,@ArticulosVenta,@GruposID,0,@ArticulosFechaInicial,5,0,@ArticulosMarca,@ArticulosReferencia,0,'',0); SELECT SCOPE_IDENTITY() AS ArticulosID;"
    );
  console.log(result);
  res.json({
    ArticulosID: result.recordset[0].ArticulosID,
    ArticulosCodigo: req.body.ArticulosCodigo,
    ArticulosNombre: req.body.ArticulosNombre,
    LineasID: req.body.LineasID,
    ArticulosUltmoCosto: req.body.ArticulosUltmoCosto,
    ArticulosCosto: req.body.ArticulosCosto,
    ArticulosVenta: req.body.ArticulosVenta,
    GruposID: req.body.GruposID,
    ArticulosFechaInicial: req.body.ArticulosFechaInicial,
    ArticulosMarca: req.body.ArticulosMarca,
    ArticulosReferencia: req.body.ArticulosReferencia,
  });
};

export const updateProduct = async (req, res) => {
 
    const pool = await getConnection()
    const result = await pool
    .request()
    .input("ArticulosID", sql.Int, req.params.ArticulosID)
    .input("ArticulosCodigo", sql.VarChar, req.body.ArticulosCodigo)
    .input("ArticulosNombre", sql.VarChar, req.body.ArticulosNombre)
    .input("LineasID", sql.Int, req.body.LineasID)
    .input("ArticulosUltmoCosto", sql.Money, req.body.ArticulosUltmoCosto)
    .input("ArticulosCosto", sql.Money, req.body.ArticulosCosto)
    .input("ArticulosVenta", sql.Money, req.body.ArticulosVenta)
    .input("GruposID", sql.Int, req.body.GruposID)
    .input("ArticulosFechaInicial", sql.Date, req.body.ArticulosFechaInicial)
    .input("ArticulosMarca", sql.VarChar, req.body.ArticulosMarca)
    .input("ArticulosReferencia", sql.VarChar, req.body.ArticulosReferencia)
    .query(
      "UPDATE AdmArticulos SET ArticulosCodigo=@ArticulosCodigo,ArticulosNombre=@ArticulosNombre,ArticulosUltmoCosto=@ArticulosUltmoCosto,ArticulosCosto=@ArticulosCosto,ArticulosVenta=@ArticulosVenta,ArticulosMarca=@ArticulosMarca,ArticulosReferencia=@ArticulosReferencia, ArticulosIncremento=0 WHERE ArticulosID=@ArticulosID"
    );

    console.log(result)

    if (result.rowsAffected[0]===0){
        return res.status(404).json({message: "Product not found"});
    }

    res.json({message: "Product updated"})

};

export const deleteProduct = async (req, res) => {

    const pool = await getConnection()
    const result = await pool.request()
    .input("ArticulosID", sql.Int, req.params.ArticulosID)
    .query("DELETE FROM AdmArticulos WHERE ArticulosID=@ArticulosID")

    console.log(result)

    if (result.rowsAffected[0]===0){
        return res.status(404).json({message: "Product not found"});
    }

    return res.json({message: "Product deleted"})
};

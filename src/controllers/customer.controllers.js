import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const getCustomers = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT TOP 2 * FROM AdmTerceros");
  res.json(result.recordset);
};

export const getCustomerByIdentification = async (req, res) => {
  const { cedula } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("cedula", sql.NVarChar, cedula)
    .query(`
      SELECT * FROM AdmTerceros 
      WHERE TercerosIdentificacion = @cedula
    `);
    
  res.json(result.recordset[0] || {});
};

export const createCustomer = async (req, res) => {
  console.log(req.body);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("TercerosTipoDoc", sql.Numeric, req.body.TercerosTipoDoc)
    .input("TercerosIdentificacion", sql.NVarChar, req.body.TercerosIdentificacion)
    .input("TercerosDv", sql.Char, req.body.TercerosDv)
    .input("TercerosPrimerNombre", sql.NVarChar, req.body.TercerosPrimerNombre)
    .input("TercerosSegundoNombre", sql.NVarChar, req.body.TercerosSegundoNombre)
    .input("TercerosPrimerApellido", sql.NVarChar, req.body.TercerosPrimerApellido)
    .input("TercerosSegundoApellido", sql.NVarChar, req.body.TercerosSegundoApellido)
    .input("TercerosRazonSocial", sql.NVarChar, req.body.TercerosRazonSocial)
    .input("TercerosNombres", sql.NVarChar, req.body.TercerosNombres)
    .input("CiudadID", sql.Int, req.body.CiudadID)
    .input("TercerosTeleFax", sql.NVarChar, req.body.TercerosTeleFax)
    .input("TercerosCelular", sql.NVarChar, req.body.TercerosCelular)
    .input("TercerosDireccion", sql.NVarChar, req.body.TercerosDireccion)
    .input("TercerosEmail", sql.NVarChar, req.body.TercerosEmail)
    .input("TercerosFechaIngreso", sql.Date, req.body.TercerosFechaIngreso)
    .input("TercerosContadoCredito", sql.Numeric, req.body.TercerosContadoCredito)
    .input("TercerosEstablecimiento", sql.NVarChar, req.body.TercerosEstablecimiento)
    .input("TercerosCupoCredito", sql.Money, req.body.TercerosCupoCredito)
    .input("TercerosDiasCredito", sql.Numeric, req.body.TercerosDiasCredito)
    .input("TipoNegocioID", sql.Numeric, req.body.TipoNegocioID)
    .input("Latitud", sql.Float, req.body.Latitud)
    .input("Longitud", sql.Float, req.body.Longitud)
    .query(
      "INSERT INTO AdmTerceros (TercerosTipoDoc,TercerosIdentificacion,TercerosDv,TercerosPrimerNombre,TercerosSegundoNombre,TercerosPrimerApellido,TercerosSegundoApellido,TercerosRazonSocial,TercerosNombres,CiudadID,TercerosTeleFax,TercerosCelular,TercerosDireccion,TercerosEmail,TercerosCliente,TercerosProveedor,TercerosEntidadOficial,TercerosEmpleado,TercerosActivosFijos,TercerosFechaIngreso,TercerosReteFuente,TercerosReteIca,TercerosBaseReteFuente,TercerosBaseReteIca,TercerosReteIva,TercerosBaseReteIva,TercerosSimplificado,TercerosContadoCredito,TercerosEstablecimiento,TercerosCupoCredito,TercerosDiasCredito,TercerosCarteraVencida,TercerosEmpleadoActivo,TercerosEmpleadoRetirado,TercerosDireccionAlterna,TercerosCodigoAlterno,TercerosRepresentanteLegal,TercerosLibretaMilitar,TercerosClaseLibreta,TercerosTipoCuenta,TercerosNumeroCuenta,TercerosSueldoBasico,TercerosAuxilioTransporte,TercerosObservaciones, TipoNegocioID, Latitud, Longitud) VALUES(@TercerosTipoDoc,@TercerosIdentificacion,@TercerosDv,@TercerosPrimerNombre,@TercerosSegundoNombre,@TercerosPrimerApellido,@TercerosSegundoApellido,@TercerosRazonSocial,@TercerosNombres,@CiudadID,@TercerosTeleFax,@TercerosCelular,@TercerosDireccion,@TercerosEmail,1,0,0,0,0,@TercerosFechaIngreso,0,0,0,0,0,0,0,@TercerosContadoCredito,@TercerosEstablecimiento,@TercerosCupoCredito,@TercerosDiasCredito,1,0,0,'','','','',0,0,'',0,0,'', @TipoNegocioID, @Latitud, @Longitud); SELECT SCOPE_IDENTITY() AS TercerosID;"
    );

  console.log(result);
  res.json({
    TercerosID: result.recordset[0].TercerosID,
    TercerosIdentificacion: req.body.TercerosIdentificacion,
    TercerosPrimerNombre: req.body.TercerosPrimerNombre,
    TercerosPrimerApellido: req.body.TercerosPrimerApellido,
  });
};

export const updateCustomer = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
    .request()
    .input("TercerosTipoDoc", sql.Numeric, req.body.TercerosTipoDoc)
    .input("TercerosIdentificacion", sql.NVarChar, req.body.TercerosIdentificacion)
    .input("TercerosDv", sql.Char, req.body.TercerosDv)
    .input("TercerosPrimerNombre", sql.NVarChar, req.body.TercerosPrimerNombre)
    .input("TercerosSegundoNombre", sql.NVarChar, req.body.TercerosSegundoNombre)
    .input("TercerosPrimerApellido", sql.NVarChar, req.body.TercerosPrimerApellido)
    .input("TercerosSegundoApellido", sql.NVarChar, req.body.TercerosSegundoApellido)
    .input("TercerosRazonSocial", sql.NVarChar, req.body.TercerosRazonSocial)
    .input("TercerosNombres", sql.NVarChar, req.body.TercerosNombres)
    .input("CiudadID", sql.Int, req.body.CiudadID)
    .input("TercerosTeleFax", sql.NVarChar, req.body.TercerosTeleFax)
    .input("TercerosCelular", sql.NVarChar, req.body.TercerosCelular)
    .input("TercerosDireccion", sql.NVarChar, req.body.TercerosDireccion)
    .input("TercerosEmail", sql.NVarChar, req.body.TercerosEmail)
    .input("TercerosFechaIngreso", sql.Date, req.body.TercerosFechaIngreso)
    .input("TercerosContadoCredito", sql.Numeric, req.body.TercerosContadoCredito)
    .input("TercerosEstablecimiento", sql.NVarChar, req.body.TercerosEstablecimiento)
    .input("TercerosCupoCredito", sql.Money, req.body.TercerosCupoCredito)
    .input("TercerosDiasCredito", sql.Numeric, req.body.TercerosDiasCredito)
    .query(
      "UPDATE AdmTerceros SET TercerosTipoDoc=@TercerosTipoDoc,TercerosIdentificacion=@TercerosIdentificacion,TercerosDv=@TercerosDv,TercerosPrimerNombre=@TercerosPrimerNombre,TercerosSegundoNombre=@TercerosSegundoNombre,TercerosPrimerApellido=@TercerosPrimerApellido,TercerosSegundoApellido=@TercerosSegundoApellido,TercerosRazonSocial=@TercerosRazonSocial,TercerosNombres=@TercerosNombres,CiudadID=@CiudadID,TercerosTeleFax=@TercerosTeleFax,TercerosCelular=@TercerosCelular,TercerosDireccion=@TercerosDireccion,TercerosEmail=@TercerosEmail,TercerosCliente=1,TercerosProveedor=0,TercerosEntidadOficial=0,TercerosEmpleado=0,TercerosActivosFijos=0,TercerosFechaIngreso=@TercerosFechaIngreso,TercerosReteFuente=0,TercerosReteIca=0,TercerosBaseReteFuente=0,TercerosBaseReteIca=0,TercerosReteIva=0,TercerosBaseReteIva=0,TercerosSimplificado=0,TercerosContadoCredito=@TercerosContadoCredito,TercerosEstablecimiento=@TercerosEstablecimiento,TercerosCupoCredito=@TercerosCupoCredito,TercerosDiasCredito=@TercerosDiasCredito,TercerosCarteraVencida=1,TercerosEmpleadoActivo=0,TercerosEmpleadoRetirado=0,TercerosDireccionAlterna='',TercerosCodigoAlterno='',TercerosRepresentanteLegal='',TercerosLibretaMilitar='',TercerosClaseLibreta=0,TercerosTipoCuenta=0,TercerosNumeroCuenta='',TercerosSueldoBasico=0,TercerosAuxilioTransporte=0,TercerosObservaciones='' WHERE TercerosID=@TercerosID"
    );

    console.log(result)

    if (result.rowsAffected[0]===0){
        return res.status(404).json({message: "Customer not found"});
    }

    res.json({message: "Customer updated"})

};

export const deleteCustomer = async (req, res) => {

    const pool = await getConnection()
    const result = await pool.request()
    .input("TercerosID", sql.Int, req.params.TercerosID)
    .query("DELETE FROM AdmTerceros WHERE TercerosID=@TercerosID")

    console.log(result)

    if (result.rowsAffected[0]===0){
        return res.status(404).json({message: "Customer not found"});
    }

    return res.json({message: "Customer deleted"})
};

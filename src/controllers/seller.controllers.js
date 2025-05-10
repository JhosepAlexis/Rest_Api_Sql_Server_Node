import { getConnection } from "../databases/connection.js";
import sql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { VendedorCodigo, Clave } = req.body;
  const tenantId = req.headers['x-tenant-id']; // Obtener tenant del header

  if (!tenantId) {
    return res.status(400).json({ 
      success: false,
      message: 'Tenant no especificado. Header X-Tenant-ID es requerido'
    });
  }

  if (!VendedorCodigo || !Clave) {
    return res.status(400).json({ 
      success: false,
      message: 'Código vendedor y contraseña son requeridos'
    });
  }

  try {
    console.log(`Conectando a BD para tenant: ${tenantId}`);
    const pool = await getConnection(tenantId); // Pasar tenantId
    
    const result = await pool
      .request()
      .input('VendedorCodigo', sql.NVarChar, VendedorCodigo)
      .query(`
        SELECT 
          VendedorID,
          VendedorCodigo,
          VendedorNombre,
          Clave,
          Activo,
          Cedula,
          Rol
        FROM AdmVendedor 
        WHERE VendedorCodigo = @VendedorCodigo
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = result.recordset[0];
    
    if (user.Activo !== 0) {
      return res.status(403).json({
        success: false,
        message: 'Cuenta desactivada. Contacte al administrador'
      });
    }

    // Comparación de contraseña (simple o con bcrypt según tu implementación)
    const passwordMatch = (Clave === user.Clave); 
    // Para bcrypt: await bcrypt.compare(Clave, user.Clave);
    
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    const token = jwt.sign(
      { 
        id: user.VendedorID,
        codigo: user.VendedorCodigo,
        nombre: user.VendedorNombre,
        rol: user.Rol,
        tenant: tenantId // Incluir tenant en el token
      }, 
      process.env.JWT_SECRET || 'tu_clave_secreta', 
      { expiresIn: '8h' }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.VendedorID,
        codigo: user.VendedorCodigo,
        nombre: user.VendedorNombre,
        cedula: user.Cedula,
        rol: user.Rol,
        tenant: tenantId
      },
      token
    });
  } catch (error) {
    console.error(`Error en login para tenant ${tenantId}:`, error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    // Verificar que el tenant del token coincida con el de la solicitud
    if (req.user.tenant !== req.headers['x-tenant-id']) {
      return res.status(403).json({
        success: false,
        message: 'Acceso no autorizado para este tenant'
      });
    }

    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};
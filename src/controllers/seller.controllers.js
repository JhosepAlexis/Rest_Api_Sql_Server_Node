import { getConnection } from "../databases/connection.js";
import sql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { VendedorCodigo, Clave } = req.body;

  // Validación básica del input
  if (!VendedorCodigo || !Clave) {
    return res.status(400).json({ 
      success: false,
      message: 'Código vendedor y contraseña son requeridos'
    });
  }

  try {
    console.log('Intentando conectar a la base de datos...');
    const pool = await getConnection();
    console.log('Conexión a BD establecida');
    
    // 1. Buscar usuario por código de vendedor
    console.log(`Buscando usuario: ${VendedorCodigo}`);
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

    console.log('Resultado de la consulta:', result.recordset);

    // 2. Verificar si el usuario existe
    if (result.recordset.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales inválidas' // Mensaje genérico por seguridad
      });
    }

    const user = result.recordset[0];
    console.log('Usuario encontrado:', user);
    
    // 3. Verificar si la cuenta está activa
    if (user.Activo !== 0) {
      return res.status(403).json({
        success: false,
        message: 'Cuenta desactivada. Contacte al administrador'

      });
    }

    console.log('Comparando contraseñas...');
    const passwordMatch = (Clave === user.Clave);
    
    if (!passwordMatch) {
      console.log('Contraseña no coincide');
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // 5. Generar JWT para autenticación
    console.log('Generando token JWT...');
    const token = jwt.sign(
      { 
        id: user.VendedorID,
        codigo: user.VendedorCodigo,
        nombre: user.VendedorNombre,
        rol: user.Rol
      }, 
      process.env.JWT_SECRET || 'tu_clave_secreta', 
      { expiresIn: '8h' }
    );
    
    // 6. Enviar respuesta exitosa
    console.log('Login exitoso');
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.VendedorID,
        codigo: user.VendedorCodigo,
        nombre: user.VendedorNombre,
        cedula: user.Cedula,
        rol: user.Rol
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor',
      error: error.message,
      stack: error.stack
    });
  }
};

// Opcional: Endpoint para verificar si el token es válido
export const verifyToken = async (req, res) => {
  try {
    // El middleware de autenticación ya habrá verificado el token
    res.status(200).json({
      success: true,
      user: req.user // Asumiendo que tienes un middleware que establece req.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};
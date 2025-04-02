import { getConnection } from "../databases/connection.js";
import sql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { codigo_vendedor, clave } = req.body;

  // Validación básica del input
  if (!codigo_vendedor || !clave) {
    return res.status(400).json({ 
      success: false,
      message: 'Código vendedor y contraseña son requeridos'
    });
  }

  try {
    const pool = await getConnection();
    
    // 1. Buscar usuario por código de vendedor
    const result = await pool
      .request()
      .input('vendedor_codigo', sql.NVarChar, VendedorCodigo)
      .query(`
        SELECT 
          VendedorID,
          VendedorCodigo,
          VendedorNombre,
          Clave,
          Activo,
          Cedula
        FROM AdmVendedor 
        WHERE VendedorCodigo = @VendedorCodigo
      `);

    // 2. Verificar si el usuario existe
    if (result.recordset.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales inválidas' // Mensaje genérico por seguridad
      });
    }

    const user = result.recordset[0];
    
    // 3. Verificar si la cuenta está activa
    if (!user.Activo) {
      return res.status(403).json({
        success: false,
        message: 'Cuenta desactivada. Contacte al administrador'
      });
    }
    
    // 4. Verificar la contraseña
    // Nota: Esto asume que estás almacenando las contraseñas con hash usando bcrypt
    // Si no es así, deberás adaptar esta parte según tu método de almacenamiento
    const passwordMatch = await bcrypt.compare(clave, user.Clave);
    
    // Si no usas bcrypt, puedes hacer una comparación directa (no recomendado para producción)
    // const passwordMatch = (clave === user.Clave);
    
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // 5. Generar JWT para autenticación
    const token = jwt.sign(
      { 
        id: user.VendedorID,
        codigo: user.VendedorCodigo,
        nombre: user.VendedorNombre
      }, 
      process.env.JWT_SECRET || 'tu_clave_secreta', 
      { expiresIn: '8h' }
    );
    
    // 6. Enviar respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.VendedorID,
        codigo: user.VendedorCodigo,
        nombre: user.VendedorNombre,
        cedula: user.Cedula
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor',
      error: error.message
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
// En tu customer.controllers.js
import { getConnection } from "../databases/connection.js";
import sql from "mssql";

export const login = async (req, res) => {
  const { codigo_vendedor, clave } = req.body;

  // Validación básica del input
  if (!codigo_vendedor || !clave) {
    return res.status(400).json({ 
      success: false,
      message: 'codigo vendedor y contraseña son requeridos'
    });
  }

  try {
    const pool = await getConnection();
    
    // 1. Buscar usuario por email
    const result = await pool
      .request()
      .input('vendedor_codigo', sql.NVarChar, codigo_vendedor)
      .query(`
        SELECT 
          VendedorID,
          VendedorCodigo,
          VendedorNombre,
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

    // // 4. Verificar contraseña con bcrypt
    // const passwordMatch = await bcrypt.compare(clave, user.Clave);
    // if (!passwordMatch) {
    //   return res.status(401).json({ 
    //     success: false,
    //     message: 'Credenciales inválidas'
    //   });
    // }

    // // 5. Generar token JWT
    // const tokenPayload = {
    //   id: user.VendedorID,
    //   codigo_vendedor: user.VendedorCodigo
    // //   rol: user.VendedorRol
    // };

    // const token = jwt.sign(
    //   tokenPayload,
    //   config.JWT_SECRET,
    //   { expiresIn: '8h' } // Token expira en 8 horas
    // );

    // 6. Preparar respuesta sin datos sensibles
    const userResponse = {
      id: user.VendedorID,
      nombre: user.VendedorNombre,
      codigo_vendedor: user.VendedorCodigo
    //   rol: user.VendedorRol
    };

    // 7. Enviar respuesta exitosa
    res.json({
      success: true,
      message: 'Autenticación exitosa',
    //   token,
      user: userResponse
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor',
      error: 'error'
    });
  }
};
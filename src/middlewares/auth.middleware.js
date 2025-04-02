import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Obtener el token del header de autorización
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado. Token no proporcionado'
    });
  }
  
  // Extraer el token
  const token = authHeader.split(' ')[1];
  
  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
    
    // Agregar la información del usuario al request
    req.user = decoded;
    
    // Continuar con la siguiente función
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};
export const tenantMiddleware = (req, res, next) => {
  try {
    // Obtener tenant ID de:
    // 1. Header (preferido para SPAs)
    // 2. Subdominio (ej: hermarly.api.dominio.com)
    // 3. Parámetro de ruta (ej: /api/hermarly/clientes)
    
    const tenantId = req.headers['x-tenant-id'] || 
                   req.subdomains[0] || 
                   req.path.split('/')[2];
    
    if (!tenantId) {
      return res.status(400).json({ 
        error: 'Tenant no especificado. Use X-Tenant-ID header' 
      });
    }

    // Adjuntar tenantId al request
    req.tenantId = tenantId;
    next();
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al procesar tenant', 
      details: error.message 
    });
  }
};
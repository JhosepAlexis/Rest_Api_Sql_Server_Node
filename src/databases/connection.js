import sql from 'mssql'
import config from './config.js'
// Cache de pools de conexión por tenant
const connectionPools = new Map();

export const getConnection = async (tenantId) => {
  try {
    // Verificar si ya tenemos un pool para este tenant
    if (connectionPools.has(tenantId)) {
      const pool = connectionPools.get(tenantId);
      // Verificar que la conexión aún sea válida
      if (pool.connected) {
        return pool;
      }
      // Si no está conectado, eliminarlo del cache
      connectionPools.delete(tenantId);
    }

    // Obtener configuración del tenant
    const tenantConfig = config.getTenantConfig(tenantId);
    
    const dbSettings = {
      user: tenantConfig.dbUser,
      password: tenantConfig.dbPassword,
      server: tenantConfig.dbServer,
      database: tenantConfig.dbDatabase,
      options: {
        encrypt: false,
        trustServerCertificate: true,
        connectTimeout: 30000,
        requestTimeout: 30000
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      }
    };

    // Crear nueva conexión
    const pool = new sql.ConnectionPool(dbSettings);
    const connection = await pool.connect();
    
    // Almacenar en cache
    connectionPools.set(tenantId, pool);
    
    return pool;
  } catch (error) {
    console.error(`Error al conectar al tenant ${tenantId}:`, error);
    throw error;
  }
};

// Middleware para limpiar conexiones inactivas
export const cleanIdleConnections = () => {
  connectionPools.forEach((pool, tenantId) => {
    if (!pool.connected) {
      connectionPools.delete(tenantId);
    }
  });
};

// Ejecutar limpieza periódicamente
setInterval(cleanIdleConnections, 60000); // Cada minuto
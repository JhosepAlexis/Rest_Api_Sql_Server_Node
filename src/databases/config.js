import {config} from "dotenv"
config();

// Configuración de tenants (puede cargarse desde una BD o servicio externo)
const tenantsConfig = {
  'hermarly': {
    dbUser: process.env.HERMARLY_DB_USER || '',
    dbPassword: process.env.HERMARLY_DB_PASSWORD || '',
    dbServer: process.env.HERMARLY_DB_SERVER || '',
    dbDatabase: process.env.HERMARLY_DB_DATABASE || ''
  },
  'ajar': {
    dbUser: process.env.AJAR_DB_USER || '',
    dbPassword: process.env.AJAR_DB_PASSWORD || '',
    dbServer: process.env.AJAR_DB_SERVER || '',
    dbDatabase: process.env.AJAR_DB_DATABASE || ''
  },
  'ola': {
    dbUser: process.env.OLA_DB_USER || '',
    dbPassword: process.env.OLA_DB_PASSWORD || '',
    dbServer: process.env.OLA_DB_SERVER || '',
    dbDatabase: process.env.OLA_DB_DATABASE || ''
  }
  // Agregar más tenants según sea necesario
};

export default {
  port: process.env.PORT || 3000,
  getTenantConfig: (tenantId) => {
    const config = tenantsConfig[tenantId];
    if (!config) {
      throw new Error(`Configuración no encontrada para el tenant: ${tenantId}`);
    }
    return config;
  }
};
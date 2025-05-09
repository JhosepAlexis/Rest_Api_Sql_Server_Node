// conexion basica a servidor de express

import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { tenantMiddleware } from './middlewares/tenant.js';
import productRoutes from './routes/products.routes.js'
import customerRoutes from './routes/customer.routes.js'
import businessRoutes from './routes/businesstype.routes.js'
import cityRoutes from './routes/city.routes.js'
import customerListSeller from './routes/customerlistseller.routes.js'
import customerListRout from './routes/customerlistrout.routes.js'
import ListVendors from './routes/listvendors.routes.js'
import login from './routes/seller.routes.js'
import verifyToken from './routes/seller.routes.js'
import ventaNoVenta from './routes/ventaNoVenta.routes.js'

dotenv.config();

const app = express()

app.use(cors({
  origin: ['http://localhost:3000', 'https://hermarly.com', 'https://carloscarvajal.info', 'https://carloscalvajal.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
  exposedHeaders: ['X-Tenant-ID']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Aplicar middleware de tenant a todas las rutas
app.use(tenantMiddleware);

app.use('/api', productRoutes);
app.use('/api', customerRoutes);
app.use('/api', businessRoutes);
app.use('/api', cityRoutes);
app.use('/api', customerListSeller);
app.use('/api', customerListRout);
app.use('/api', ListVendors);
app.use('/api', login);
app.use('/api', verifyToken);
app.use('/api', ventaNoVenta);

// Manejador de errores para tenant no encontrado
app.use((err, req, res, next) => {
  if (err.message.includes('Configuración no encontrada para el tenant')) {
    return res.status(404).json({ 
      error: 'Tenant no encontrado',
      tenantId: req.tenantId
    });
  }
  next(err);
});

export default app

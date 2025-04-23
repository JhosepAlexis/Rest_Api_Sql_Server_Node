// conexion basica a servidor de express

import express from 'express'
import cors from 'cors';
import productRoutes from './routes/products.routes.js'
import customerRoutes from './routes/customer.routes.js'
import businessRoutes from './routes/businesstype.routes.js'
import cityRoutes from './routes/city.routes.js'
import customerListSeller from './routes/customerlistseller.routes.js'
import customerListRout from './routes/customerlistrout.routes.js'
import ListVendors from './routes/listvendors.routes.js'
import login from './routes/seller.routes.js'
import verifyToken from './routes/seller.routes.js'
import dotenv from 'dotenv';
import ventaNoVenta from './routes/ventaNoVenta.routes.js'

dotenv.config();

const app = express()


app.use(cors({
  origin: ['http://localhost:3000', 'https://hermarly.com', 'https://carloscarvajal.info'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(productRoutes)
app.use(customerRoutes)
app.use(businessRoutes)
app.use(cityRoutes)
app.use(customerListSeller)
app.use(customerListRout)
app.use(ListVendors)
app.use(login)
app.use(verifyToken)
app.use(ventaNoVenta)


export default app

// conexion basica a servidor de express

import express from 'express'
import productRoutes from './routes/products.routes.js'
import customerRoutes from './routes/customer.routes.js'
import businessRoutes from './routes/businesstype.routes.js'
import cityRoutes from './routes/city.routes.js'
import latlonRoutes from './routes/latlon.routes.js'
import login from './routes/seller.routes.js'
import verifyToken from './routes/seller.routes.js'
import cors from 'cors';


const app = express()


app.use(cors({
    origin: '*', // En desarrollo puedes usar '*' para permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(productRoutes)
app.use(customerRoutes)
app.use(businessRoutes)
app.use(cityRoutes)
app.use(latlonRoutes)
app.use(login)
app.use(verifyToken)


export default app
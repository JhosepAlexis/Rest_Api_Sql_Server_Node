// conexion basica a servidor de express

import express from 'express'
import productRoutes from './routes/products.routes.js'
import customerRoutes from './routes/customer.routes.js'
import businessRoutes from './routes/businesstype.routes.js'

const app = express()
app.use(express.json())
app.use(productRoutes)
app.use(customerRoutes)
app.use(businessRoutes)



export default app
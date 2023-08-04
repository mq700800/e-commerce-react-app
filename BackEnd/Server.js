const express = require('express');
const {errorHandler} = require('./MiddleWares/errorMiddleware');
const dotenv = require('dotenv');
const products = require('./data/Products');
const connectDb= require('./configuration/config');
const productRoutes = require('./routes/productsRoute');
const usersRoutes = require('./routes/usersRoute');
const orderRoute = require('./routes/orderRoute');
dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
res.send('<h1>Welcome to node Server</h1>')

});

app.use('/api',productRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/orders',orderRoute);
app.get('/api/config/paypal',(req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

app.use(errorHandler);

const PORT=4000;
app.listen( PORT||process.env.PORT,()=>
{console.log(`Server Running on Port ${process.env.PORT} & 4000 ${process.env.MYVAR}`);
});


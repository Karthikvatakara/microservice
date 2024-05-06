import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import proxy from 'express-http-proxy'
import morgan from 'morgan'

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))

app.use('/auth',proxy('http://localhost:8001'));
app.use('/admin',proxy('http://localhost:8003'));
app.use('/product',proxy('http://localhost:8005'));
app.use('/cart',proxy('http://localhost:8004'));

app.get('/hai',(req,res) =>{
    res.send("haihiahihahf")
})

const PORT = process.env.PORT || 8000
app.listen(PORT,() =>{
    console.log(`gateway is running on port ${PORT}`);
    
})
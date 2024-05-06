import express,{Response,Request,NextFunction,Application} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { addProduct } from "../infrastructure/routes/addProduct";
import { dependencies } from "../config/dependencies";


dotenv.config();

const app:Application = express();
const PORT: number = Number(process.env.PORT || 8004);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.get('/test',(req:Request,res:Request) => {
//     res.send("tested")
// })
app.use(addProduct(dependencies))

app.use((err:Error,req:Request,res:Response,next:NextFunction) => {
    const errorResponses = {
        errors:[{ message:err?.message || "something went wrong"}],
    }
    return res.status(500).json(errorResponses);
});

app.listen(PORT,() => {
    console.log(`connected to product-service ${PORT}`);
    
})

export default app;
import express,{ Application,Request,Response,NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {adminRoutes} from "../infrastructure/routes/adminRoutes"
import { dependencies } from "../config/dependencies";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8003;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.get('/hai',(req:Request,res:Response)=> {
//     res.send("testing hai")
// })
app.use('/',adminRoutes(dependencies))

app.use((error:Error,req:Request,res:Response,next:NextFunction) => {
    console.log(error);
    const errorResponses = {
        errors:[{message:error?.message || "something went wrong"}]
    }
    return res.status(200).json(errorResponses);
    
})


app.listen(PORT,() => {
    console.log(`connected to admin-service in port ${PORT}`);
    
})

export default app;

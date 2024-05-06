import server from "./presentation/server";
import dbconnection from "./infrastructure/database/dbconnection";

(async() => {
    try{
        server;
        await dbconnection().catch((error:any) => {
            console.error("database connection error",error.message);
            process.exit(1);    
        })
        console.log("admin-service started succesfully");
    }catch(error:any){
        console.error("admin-server initialization failed",error.meass )
        process.exit(1);
    }
})();
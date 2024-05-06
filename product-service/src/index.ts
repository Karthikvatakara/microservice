import server   from "./presentation/server";
import dbconnection from "./infrastructure/database/dbconnection";

(async() => {
    try{  
      server
      dbconnection();
    }catch(error:any){
        console.log("error occured",error?.message);
        process.exit(1);
    }
})();
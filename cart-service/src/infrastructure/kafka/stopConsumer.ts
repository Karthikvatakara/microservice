import {consumer} from ".";

export const stopConsumer = async () => {
    try{
        console.log("stoping consumer");
        await consumer.stop();
        await consumer.disconnect();
        console.log("consumer stopped");
        
    }catch(error:any){
        console.error("error stopping consumer",error);
        throw new Error(error?.message)
    }
}
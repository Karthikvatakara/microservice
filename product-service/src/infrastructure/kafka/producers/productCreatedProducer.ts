import { producer } from "..";
import { Types } from "mongoose";

export const productCreatedProducer = async(data:{
    _id?: string;
    name:string;
    description:string;
    price:number;
    stock:number;
} 
)=>{
    try{
        await producer.connect();

        const message = {
            topic: 'product',
            messages: [{
                key: 'productCreated',
                value: JSON.stringify(data)
            }]
        }

        await producer.send(message).then((data)=>{
            console.log('--=0-=0=-0-=0-=0-0-00-=0=-0-=00-=0-=0-=0-00=0-0=-0=-0',data)
        })
    }catch(error:any){
        console.error("kafka produce error",error?.message)
    }
}
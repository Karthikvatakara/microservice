import { consumer } from ".";
import { createSubscriber } from "./subscriber";
import { stopConsumer } from "./stopConsumer";

export const runConsumer = async() => {
    try{
        await consumer.connect();

        await consumer.subscribe({
            topic: 'to-user',
            fromBeginning: true
        })

        await consumer.subscribe({
            topic:'product',
            fromBeginning: true
        })

        const subscriber:any = createSubscriber();
        console.log("🚀 ~ runConsumer ~ subscriber:", subscriber)
        console.log("hereeeeeeeeeeeee");
        await consumer.run({
            eachMessage: async({message}) => {
                const {key,value} = message;
                console.log("🚀 ~ eachMessage:async ~ message:", String(key))
                const subscriberMethod = String(key);
                console.log("🚀 ~ eachMessage:async ~ subscriberMethod:", subscriber[subscriberMethod])
                const subscriberData = JSON.parse(String(value));

                try{
                    await subscriber[subscriberMethod](subscriberData);
                }catch(error:any){
                    console.log(`error processing message from topic:${error.message}`);
                    throw new Error(error?.message);
                    await stopConsumer();
                }
                    console.log("🚀 ~ eachMessage:async ~ subscriber[subscriberMethod]:", subscriber[subscriberMethod])
                    console.log("🚀 ~ eachMessage:async ~ subscriber[subscriberMethod]:", subscriber[subscriberMethod])
            }
        })
        

    }catch(error:any){
        throw new Error(error?.message)
    }
}
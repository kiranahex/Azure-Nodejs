import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const endpoint="https://firstapi.mongo.cosmos.azure.com"
const key="mongodb://firstapi:5ydgY4EeuvAkZ4pxn2L1wvyInKHzBZFtwL6c0p5NBkZX1T9lZHrHamhv3KlJ4pFKAcjL8UUOx5mYACDbtegTmw==@firstapi.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@firstapi@"
const client = new CosmosClient({endpoint,key})

const databaseId="Task";
const containerId="tasks";

const database=client.database(databaseId)
const container=database.container(containerId)

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest) {

 const task = [{
"name":"task1"
 }]
 let data=JSON.stringify(task)
 console.log(data)

    const {resource:createItem}= await container.items.create(task);

    const responseMessage=`Successfully inserted ${createItem}`
   
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;
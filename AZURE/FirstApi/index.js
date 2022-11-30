const CosmoClient=require("@azure/cosmos").CosmosClient

const endpoint ="http://firstapi.mongo.cosmos.azure.com";
const key="mongodb://firstapi:5ydgY4EeuvAkZ4pxn2L1wvyInKHzBZFtwL6c0p5NBkZX1T9lZHrHamhv3KlJ4pFKAcjL8UUOx5mYACDbtegTmw==@firstapi.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@firstapi@";

const client = new CosmoClient({endpoint,key});

const databaseId="tasksDB";
const containerId="task";

const database=client.database(databaseId);
const container=database.container(containerId)



module.exports = async function (context, req) {

try {
    // let taskItem={
    //     "id":1,
    //     "name": req.query.name

    //   };
    //   console.log(taskItem)

    
    
      const {body:createItem} =await container.items.create({
        "id":"1",
        "task":"my task"
      });
    
      const responseMessage= `successfully inserted ${createItem}`;
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
} catch (error) {
    console.log(error)
}

}
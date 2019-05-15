export class Serialize {
     serialize(data: Object) {

     }

     deserialize(data: string) {
          let parsedJSON = JSON.parse(data)

          if (parsedJSON.functionName && parsedJSON.functionParameters && parsedJSON.contract) {
               return parsedJSON;
          }
     }
}
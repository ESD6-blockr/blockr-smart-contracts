export class Serialize {
     serialize(data: Object) {

     }

     deserialize(data: string) {

          let parsedJSON = JSON.parse(data)

          console.log(parsedJSON.function.functionName);

          return parsedJSON;

          // if (parsedJSON.functionName && parsedJSON.functionParameters && parsedJSON.contract) {
          //      return parsedJSON;
          // }
     }
}
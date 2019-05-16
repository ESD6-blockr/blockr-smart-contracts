"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Serialize {
    serialize(data) {
    }
    deserialize(data) {
        let parsedJSON = JSON.parse(data);
        console.log(parsedJSON.function.functionName);
        return parsedJSON;
        // if (parsedJSON.functionName && parsedJSON.functionParameters && parsedJSON.contract) {
        //      return parsedJSON;
        // }
    }
}
exports.Serialize = Serialize;
//# sourceMappingURL=serializer.js.map
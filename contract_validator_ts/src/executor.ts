import { Json } from "serialazy";
import { JsonMap } from "serialazy/lib/dist/types/json_type";

export class Executor {
    constructor() {
    }
    
    executeContract(contract: Object, functions: JsonMap) {
        var functionToExec = functions["function"]
        if(functions == null || functionToExec == null) {
            // The contract needs to be constructed
            
        } else {
            // The specified method should be called
            
        }
    }
}
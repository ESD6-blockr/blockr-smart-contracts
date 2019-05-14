import { Json } from "serialazy";

export class Executor {
    constructor() {
    }
    
    executeContract(contract: Object, toExecute: string, properties: Json) {
        if(toExecute == null) {
            // The contract needs to be constructed
            
        } else {
            // The specified method should be called

        }
    }
}
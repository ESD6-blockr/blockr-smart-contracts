"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Executor {
    /**
     * this rebuilds a contract from json and returns
     * @contractJson a Json string following the contract conventions
     * @returns a instance of the contract
     */
    rebuildContract(contractJson) {
        let contractTemplate = eval('(' + contractJson.classTemplate.contract + ')');
        let constructorParams = contractJson["constructor"];
        let args = [];
        for (let param in constructorParams) {
            if (constructorParams.hasOwnProperty(param)) {
                args.push(constructorParams[param]);
            }
        }
        return new contractTemplate(...args);
    }
    /**
     * this reads all functions from the contract json
     * @contractJson a Json string following the contract conventions
     * @returns a instance of the contract
     */
    readFunctions(contractJson) {
        return contractJson.function;
    }
    /**
     * executes a function in the given contract
     * @classInstance an instance of the contract where the method needs to be executed
     * @functionJson the Json string of the function following the contract conventions
     * @returns the return value of the executed function
     */
    executeFunction(classInstance, functionJson) {
        let functionName = functionJson["functionName"];
        let functionParams = functionJson["functionParameters"];
        let args = [];
        for (let param in functionParams) {
            if (functionParams.hasOwnProperty(param)) {
                args.push(functionParams[param]);
            }
        }
        return classInstance[functionName](...args);
    }
    executeContract(data) {
        let contract = this.rebuildContract(data);
        let functions = this.readFunctions(data);
        functions.forEach(function (func) {
            contract = this.executeFunction(contract, func);
        });
        console.log(contract);
        // Nu contract weer terug serializeren
    }
}
exports.Executor = Executor;
//# sourceMappingURL=executor.js.map
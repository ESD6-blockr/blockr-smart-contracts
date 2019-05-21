export class Executor {
    /**
     * this rebuilds a contract from json and returns
     * @contractJson a Json string following the contract conventions
     * @returns a instance of the contract
     */
    rebuildContract(contractJson: any) {
        let contractTemplate = eval('(' + contractJson.classTemplate.contract + ')');
        let constructorParams = contractJson["constructor"];
        let args: any[] = [];

        for (let param in constructorParams) {
            if (constructorParams.hasOwnProperty(param)) {
                args.push(constructorParams[param]);
            }
        }
        return new contractTemplate(...args);
    }

    /**
     * executes a function in the given contract
     * @classInstance an instance of the contract where the method needs to be executed
     * @functionJson the Json string of the function following the contract conventions
     * @returns the return value of the executed function
     */
    executeFunction(classInstance: any, functionJson: any) {
        let functionName = functionJson["functionName"];
        let functionParams = functionJson["functionParameters"];

        let args: any[] = [];

        for (let param in functionParams) {
            if (functionParams.hasOwnProperty(param)) {
                args.push(functionParams[param]);
            }
        }
        return classInstance[functionName](...args);
    }
}

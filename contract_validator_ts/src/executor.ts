export class Executor {
    /**
     * this rebuilds a contract from json and returns
     * @param contractJson, a Json string following the contract conventions
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
     * this reads all functions from the contract json
     * @contractJson a Json string following the contract conventions
     * @returns a instance of the contract
     */
    readFunctions(contractJson: any) {
        return contractJson.function;
    }

    /**
     * executes a function in the given contract
     * @param classInstance, an instance of the contract where the method needs to be executed
     * @param functionJson, the Json string of the function following the contract conventions
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

    executeContract(data: any) {
        let contract: object = this.rebuildContract(data);
        let functions = this.readFunctions(data);

        if(functions) {
            this.executeFunction(contract, functions);
        }

        console.log(contract);

        // Nu contract weer terug serializeren
    }

    /**
     * creates a Json string with all functions and their parameters from the given class instance
     * @param classInstance the instance of the class to get the functions from
     * @returns a Json string with the functions an their parameters
     */
    getFunctionsFromClass(classInstance: any) {
        let functionArray = {
            functions: []
        };

        let functions = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(classInstance));
        for (let val in functions) {
            if (functions.hasOwnProperty(val)) {
                let func = functions[val].value;
                let paras = this.getParamNames(func);
                functionArray.functions.push({functionName: val, parameters: paras});
            }
        }
        return JSON.stringify(functionArray);
    }


    /**
     * gets the parameters from the given function
     * @param func, the function to get the parameters from
     * @returns string with the function parameters
     */
    private getParamNames(func: any) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;

        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    }
}

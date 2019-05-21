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
     * this reads all functions from the contract json
     * @contractJson a Json string following the contract conventions
     * @returns a instance of the contract
     */
    readFunctions(contractJson: any) {
        return contractJson.function;
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

    executeContract(data: any) {
        let contract: Object = this.rebuildContract(data);
        let functions = this.readFunctions(data);

        functions.forEach(function (func: any) {
            contract = this.executeFunction(contract, func);
        });

        console.log(contract);

        // Nu contract weer terug serializeren
    }


    getFunctionsFromClass(classObj: any) {
        let functionArray = {
            functions: []
        };

        let functions = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(classObj));
        for (let val in functions) {
            if (functions.hasOwnProperty(val)) {
                let func = functions[val].value;
                let paras = this.getParamNames(func);
                functionArray.functions.push({functionName: val, parameters: paras});
            }
        }
        return JSON.stringify(functionArray);
    }

    private getParamNames(func: any) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;

        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    }
}

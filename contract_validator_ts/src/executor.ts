import "reflect-metadata";

export class Executor {
    /**
     * this rebuilds a contract from json and returns it
     * @param contractJson, a Json string following the contract conventions
     * @param isInit, a boolean that specifies if is the first build of the contract
     * @returns a instance of the contract
     */
    private static rebuildContract(contractJson: any, isInit: boolean): object {
        try {
            let contractTemplate = this.getContractTemplate(contractJson);
            if (!isInit) {
                let constructorParams = contractJson["constructor"];

                //if the constructor in the Json is incorrect constructorParams will be the default constructor
                //if this is the case constructorParams will be a function and null will be returned to show that a error occurred
                if (constructorParams instanceof Function) {
                    return null;
                }

                let args: any[] = this.getArgs(constructorParams, contractTemplate.prototype, "constructor");
                if (args !== null) {
                    return new contractTemplate(...args);
                }
            } else {
                let contract = new contractTemplate();
                let initParams = contractJson["function"]["functionParameters"];
                let args = this.getArgs(initParams, contractTemplate.prototype, "initConstructor");

                if (args !== null) {
                    contract["initConstructor"](...args);
                    return contract;
                }
            }
        } catch (e) {
            console.log(e);
        }

    }

    /**
     * checks the given params for the amount and name
     * @param fromArray the unchecked params
     * @param contractPrototype, a prototype of the contract
     * @param functionName, the name of the function to check
     * @returns a array of the params or null if an error occurred.
     */
    private static getArgs(fromArray: any[], contractPrototype, functionName: string): any[] {
        try {
            let params: any[] = this.getParameters(contractPrototype, functionName);
            let args: any[] = [];
            for (let param in fromArray) {
                if (fromArray.hasOwnProperty(param)) {
                    if (!params.includes(param)) {
                        return null;
                    }
                    args.push(fromArray[param]);
                }
            }
            if (args.length !== params.length) {
                return null;
            }
            return args;
        } catch (e) {
            return null;
        }

    }

    /**
     * gives a array with all parameters of a function
     * @param contractPrototype, a prototype of the contract
     * @param functionName, the name of the function to execute
     * @returns an array with all parameters of the given function
     */
    private static getParameters(contractPrototype: any, functionName: string): any[] {
        try {
            let functions = Object.getOwnPropertyDescriptors(contractPrototype);
            if (functions[functionName]) {
                return this.getParamNames(functions[functionName].value);
            }
        } catch (e) {
            return null;
        }

    }

    /**
     * creates a template of a contract from Json, can be improved by validating the evaluated contracts
     * @param contractJson, a Json string following the contract conventions
     * @returns a template of a contract
     */
    private static getContractTemplate(contractJson: any): any {
        try {
            return eval('(' + contractJson["classTemplate"]["contract"] + ')');
        } catch (e) {
            return null;
        }

    }
    /**
     * executes a function in the given contract
     * @param classInstance, an instance of the contract where the method needs to be executed
     * @param functionJson, the Json string of the function following the contract conventions
     * @returns the return value of the executed function
     */
    private static executeFunction(classInstance: any, functionJson: any): any {
        try{
            let functionName = functionJson["functionName"];
            let functionParams = functionJson["functionParameters"];
            let args: any[] = this.getArgs(functionParams, Object.getPrototypeOf(classInstance), functionName);

            if (args !== null) {
                return classInstance[functionName](...args);
            }
            return null;
        } catch (e) {
            return null;
        }

    }

    /**
     * executes the received contract
     * @param data, the smart contract data and functions that need to be called
     * @returns a Json string of the executed contract that needs to be put on the blockchain
     */
    public static executeContract(data: any): string {
        try {
            let isInit: boolean = false;
            let functions = data["function"];
            if (functions !== null && functions["functionName"] === "initConstructor") {
                isInit = true;
            }

            let contract: object = this.rebuildContract(data, isInit);
            let result: any;

            if (functions && contract !== null) {
                result = this.executeFunction(contract, functions);
                if (result !== null) {
                    return this.returnJson(contract, result, data.classTemplate.contract);
                }
            }

        } catch (e) {
            return null;
        }

    }

    /**
     * creates a Json string with all functions and their parameters from the given class instance
     * @param contractJson the smart contract data
     * @returns a Json string with the functions an their parameters
     */
    public static getContractFunctions(contractJson: any): string {

            let functionArray = {
                functions: []
            };

            let contractTemplate = this.getContractTemplate(contractJson);
            let functions = Object.getOwnPropertyDescriptors(contractTemplate.prototype);
            for (let val in functions) {
                if (functions.hasOwnProperty(val)) {
                    let func = functions[val].value;
                    let paras = this.getParamNames(func);
                    functionArray.functions.push({functionName: val, parameters: paras});
                } else {
                    throw new Error('Function has no valid parameters')
                }
            }
            return JSON.stringify(functionArray);


    }

    /**
     * gets the parameters from the given function
     * @author
     * @param func, the function to get the parameters from
     * @returns string with the function parameters
     */
    private static getParamNames(func: any): string[] {
        try {
            const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            const ARGUMENT_NAMES = /([^\s,]+)/g;

            let fnStr = func.toString().replace(STRIP_COMMENTS, '');
            return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        } catch (e) {
            return null;
        }

    }

    /**
     * builds Json to return after a function is completed
     * @param contract, the contract object that has been executed
     * @param result, the result of the executed function
     * @param template, the template of this contract
     * @returns json that needs to be saved on the blockchain
     */
    private static returnJson(contract: object, result: any, template: string) : string{
        try {
            return JSON.stringify({
                "constructor": JSON.stringify(contract),
                "result": result,
                "classTemplate": {
                    "contract": template
                }
            });
        } catch (e) {
            return null;
        }

    }

}

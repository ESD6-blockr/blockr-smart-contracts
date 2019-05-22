import {getControlFlowEnd} from "tsutils";

export class Executor {
    /**
     * this rebuilds a contract from json and returns
     * @param contractJson, a Json string following the contract conventions
     * @returns a instance of the contract
     */
    private static rebuildContract(contractJson: any) {

        let contractTemplate = this.getContractTemplate(contractJson);
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
     * creates a template of a contract from Json, can be improved by validating the evaluated contracts
     * @param contractJson, a Json string following the contract conventions
     * @returns a template of a contract
     */
    private static getContractTemplate(contractJson: any) {
        return eval('(' + contractJson["classTemplate"]["contract"] + ')');
    }

    /**
     * executes a function in the given contract
     * @param classInstance, an instance of the contract where the method needs to be executed
     * @param functionJson, the Json string of the function following the contract conventions
     * @returns the return value of the executed function
     */
    private static executeFunction(classInstance: any, functionJson: any) {
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

    /**
     * executes the received contract
     * @param data, the smart contract data and functions that need to be called
     * @returns a Json string of the executed contract that needs to be put on the blockchain
     */
    public static executeContract(data: any) {
        let contract: object = this.rebuildContract(data);

        let functions = data["function"];

        if(functions) {
            this.executeFunction(contract, functions);
        }

        return this.returnJson(contract, data.classTemplate.contract);
    }

    /**
     * creates a Json string with all functions and their parameters from the given class instance
     * @param contractJson the smart contract data
     * @returns a Json string with the functions an their parameters
     */
    public static getContractFunctions(contractJson: any) {
        let functionArray = {
            functions: []
        };

        let contractTemplate = this.getContractTemplate(contractJson);
        let functions = Object.getOwnPropertyDescriptors(contractTemplate.prototype);
        for (let val in functions) {
            if (functions.hasOwnProperty(val)) {
                let func = functions[val].value;
                let paras = this.getParamNames(func);
                functionArray.functions.push({ functionName: val, parameters: paras });
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
    private static getParamNames(func: any) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;

        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    }

    /**
     * gets the parameters from the given function
     * @param contract, the contract object that has been executed
     * @param template, the template of this contract
     * @returns json that needs to be saved on the blockchain
     */
    private static returnJson(contract: object, template: string) {
        return JSON.stringify({
            "constructor": JSON.stringify(contract),
            "classTemplate": {
                "contract": template
            }
        });
    }
}

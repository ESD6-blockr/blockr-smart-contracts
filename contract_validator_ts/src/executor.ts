export class Executor {
    rebuildContract(contractJson: any) {
        let contractTemplate = eval('(' + contractJson.classTemplate.contract + ')');
        let constructorParams = contractJson["constructor"];
        let args: any[] = [];

        for(let param in constructorParams) {
            if(constructorParams.hasOwnProperty(param)) {
                args.push(constructorParams[param]);
            }
        }
        return new contractTemplate(...args);
    }

    executeFunction(classInstance: any, functionJson: any) {
        let functionName = functionJson["functionName"];
        let functionParams = functionJson["functionParameters"];

        let args: any[] = [];

        for(let param in functionParams) {
            if(functionParams.hasOwnProperty(param)) {
                args.push(functionParams[param]);
            }
        }
        classInstance[functionName](...args);
    }
}

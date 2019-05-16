export class Executor {
    constructor() {
    }
    
    executeContract(contract: any) {
        
        // console.log(contract)

        console.log(eval(contract.classTemplate.contract));

    }
}
import { Executor} from "../executor";
import {ReviewIPFSContract} from "./test.reviewContract";
import data from "./valid/test.dataContract.json";
import executed from "./valid/test.executedContract.json";
import functions from "./valid/test.functionContract.json";
import nvData from "./nonvalid/test.nonValidDataContract.json";
import nvExecuted from "./nonvalid/test.nonValidExecutedContract.json"
import nvFunctions from "./nonvalid/test.nonValidFunctionContract.json"

let contract = new ReviewIPFSContract('9031D18C65871FED54C25BDBFD8852E0A2B49B2D','Student1',['Teacher1', 'Teacher2'],['Feedback']);
let dataContract = <any>data;
let executedContract = <any>executed;
let functionContract = <any>functions;
let nonValidData = <any>nvData;
let nonValidExecuted = <any>nvExecuted;
let nonValidFuncion = <any>nvFunctions;

describe('executeContract',function () {

    it('should succeed', function () {
        let ctr = Executor.executeContract(dataContract);
        expect(ctr).not.toBeNull();
        expect(ctr).toMatch(JSON.stringify(executedContract));
    });

    it('should be null', function(){
        let ctr = Executor.executeContract(nonValidData);

        expect(ctr).toBeNull();
    })

})

describe('getContractFunctions',function () {
    it('should succeed', function () {
        let fnc = Executor.getContractFunctions(dataContract);
        expect(fnc).not.toBeNull();
        expect(fnc).toMatch(JSON.stringify(functionContract));
    })

    it('should not match', function(){
        let fnc = Executor.getContractFunctions(nonValidData);
        expect(fnc).not.toBeNull();
        expect(fnc).not.toMatch(JSON.stringify(functionContract));
    })

    it('should be null', function(){
        function emptyJson(){
           return Executor.getContractFunctions({});
        }
        expect(emptyJson()).toBeNull();
    })

})

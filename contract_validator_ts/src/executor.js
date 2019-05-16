"use strict";
exports.__esModule = true;
var Executor = /** @class */ (function () {
    function Executor() {
    }
    Executor.prototype.executeContract = function (contract) {
        // console.log(contract)
        eval(contract.contract);
    };
    return Executor;
}());
exports.Executor = Executor;

"use strict";
exports.__esModule = true;
var Serialize = /** @class */ (function () {
    function Serialize() {
    }
    Serialize.prototype.serialize = function (data) {
    };
    Serialize.prototype.deserialize = function (data) {
        var parsedJSON = JSON.parse(data);
        if (parsedJSON.functionName && parsedJSON.functionParameters && parsedJSON.contract) {
            return parsedJSON;
        }
    };
    return Serialize;
}());
exports.Serialize = Serialize;

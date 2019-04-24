const Models = require('bluckur-models');

let instance = null;

class SmartContractValidator {

    constructor() { }

    /**
     * @param {Block} block [description]
     */
    validate(block) {
        if (this.hasTransactions(block)) {
            if (this.hasContract(block)) {
                return true;
            }
        }
        return false;
    }

    hasTransactions(block) {
        return block.transactions.length > 0;
    }

    hasContract(block) {
        for(let i = 0; i < block.transactions.length; i++) {
            let t = block.transactions[i];
            console.log(t);
            if(!this.isEmpty(t.contract)) {
                return true;
            }
        }

        return false;
    }

    isEmpty(str) {
        return (!str || 0 === str.length);
    }
}
module.exports = {
    getInstance() {
        if (!instance) {
            instance = new SmartContractValidator()
        }
        return instance;
    }
}
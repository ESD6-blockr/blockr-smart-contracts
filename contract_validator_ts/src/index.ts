import {Executor} from "./executor";
import {createPeer} from "./peer";
import * as request from "request-promise-native";

let data = {
    "constructor": {
        "hash": "IPFS Hash",
        "owner": "Creator Address",
        "reviewers": [
            "Ocean Man 1",
            "Careless Whisper 2",
            "Allstar 3"
        ],
        "feedback": []
    },
    "function": {
        "functionName": "postFeedback",
        "functionParameters": {
            "address": "Allstar 3",
            "feedback": "feedback",
            "hash": "IPFS Hash"
        }
    },
    //"function": {
    //    "functionName": "initConstructor",
    //    "functionParameters": {
    //        "hash": "IPFS Hash",
    //        "owner": "Creator Address",
    //        "reviewers": [
    //            "Ocean Man 1",
    //            "Careless Whisper 2",
    //            "Allstar 3"
    //        ]
    //    }
    //},
    "classTemplate": {
        "contract": "class ReviewIPFSContract {\r\n    constructor(hash, owner, reviewers, feedback) {\r\n        this.ipfsHash = hash;\r\n        this.owner = owner;\r\n        this.reviewers = reviewers;\r\n        this.feedback = feedback;\r\n    }\r\n    initConstructor(hash, owner, reviewers) {\r\n        this.ipfsHash = hash;\r\n        this.owner = owner;\r\n        this.reviewers = reviewers;\r\n        this.feedback = [];\r\n    }\r\n    postFeedback(address, feedback, hash) {\r\n        if (this.ipfsHash != hash)\r\n            return \"This contract covers a different IPFS file\";\r\n        if (!this.reviewers.includes(address))\r\n            return \"You're not authorized to review this file\";\r\n        this.feedback.push(feedback);\r\n        return \"Posting feedback succeeded\";\r\n    }\r\n    getFeedback(address) {\r\n        if (this.owner != address)\r\n            return \"Only the owner can fetch feedback\";\r\n        return this.feedback;\r\n    }\r\n}"
    }
};
//console.log(Executor.executeContract(data));
//console.log(Executor.getContractFunctions(data));

//console.log(createPeer());

export class Index{
    constructor(){
        this.getContract();
    }
    async getContract(){
        try {
            const baseUrl = 'http://145.93.165.33:3000';
            const queryString = '/ptsmock/transaction';
            var options = {
                uri: baseUrl + queryString,
            };

            const result = await request.get(options);
            console.log(result);
        } catch (e) {
            console.log(e)
        }

    }
}

new Index();

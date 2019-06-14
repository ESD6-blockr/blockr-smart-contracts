export const data = {
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

export let data2 = {
    "constructor": {
        "functionName": "constructor",
        "functionParameters": {
            "hash": "4312",
            "owner": "134",
            "reviewers": [
                "1324"
            ],
            "feedback": []
        }
    },
    "function": {
        "functionName": "initConstructor",
        "functionParameters": {
            "hash": "4312",
            "owner": "134",
            "reviewers": [
                "1324"
            ]
        }
    },
    "classTemplate": {
        "contract": "export class ReviewIPFSContract {\r\n    // The IPFS hash of the file that needs to be reviewed\r\n    private ipfsHash: string\r\n    // The owner address of the contract\r\n    private owner: string\r\n    // An array of addresses that are allowed to review the file\r\n    private reviewers: string[]\r\n    // Anonymous feedback\r\n    private feedback: string[]\r\n    constructor(hash: string, owner: string, reviewers: string[], feedback: string[]) {\r\n        this.ipfsHash = hash\r\n        this.owner = owner\r\n        this.reviewers = reviewers\r\n        this.feedback = feedback\r\n    }\r\n    initConstructor(hash: string, owner: string, reviewers: string[]) {\r\n        this.ipfsHash = hash\r\n        this.owner = owner\r\n        this.reviewers = reviewers\r\n        this.feedback = []\r\n    }\r\n    postFeedback(address: string, feedback: string, hash: string) {\r\n        if (this.ipfsHash !== hash)\r\n            return \"This contract covers a different IPFS file\"\r\n        if (!this.reviewers.includes(address))\r\n            return \"You're not authorized to review this file\"\r\n        this.feedback.push(feedback)\r\n        return \"Posting feedback succeeded\"\r\n    }\r\n    getFeedback(address: string) {\r\n        if (this.owner !== address)\r\n            return \"Only the owner can fetch feedback\"\r\n        return this.feedback\r\n    }\r\n} "
    }
};

const constructorFunction =
    {
        "constructor": {
            "functionName": "constructor",
            "functionParameters": {
                "hash": "4312",
                "owner": "134",
                "reviewers": [
                    "1324"
                ],
                "feedback": []
            }
        },
        "classTemplate": {
            "contract": "export class ReviewIPFSContract {\r\n    // The IPFS hash of the file that needs to be reviewed\r\n    private ipfsHash: string\r\n    // The owner address of the contract\r\n    private owner: string\r\n    // An array of addresses that are allowed to review the file\r\n    private reviewers: string[]\r\n    // Anonymous feedback\r\n    private feedback: string[]\r\n    constructor(hash: string, owner: string, reviewers: string[], feedback: string[]) {\r\n        this.ipfsHash = hash\r\n        this.owner = owner\r\n        this.reviewers = reviewers\r\n        this.feedback = feedback\r\n    }\r\n    initConstructor(hash: string, owner: string, reviewers: string[]) {\r\n        this.ipfsHash = hash\r\n        this.owner = owner\r\n        this.reviewers = reviewers\r\n        this.feedback = []\r\n    }\r\n    postFeedback(address: string, feedback: string, hash: string) {\r\n        if (this.ipfsHash !== hash)\r\n            return \"This contract covers a different IPFS file\"\r\n        if (!this.reviewers.includes(address))\r\n            return \"You're not authorized to review this file\"\r\n        this.feedback.push(feedback)\r\n        return \"Posting feedback succeeded\"\r\n    }\r\n    getFeedback(address: string) {\r\n        if (this.owner !== address)\r\n            return \"Only the owner can fetch feedback\"\r\n        return this.feedback\r\n    }\r\n} "
        }
    };

export let pairs = {
    "123": constructorFunction
};

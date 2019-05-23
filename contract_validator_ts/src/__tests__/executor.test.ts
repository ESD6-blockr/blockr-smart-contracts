import { Executor} from "../executor";


let contract = {
    "constructor": {
        "hash": "IPFS Hash",
        "teacher": "Creator Address",
        "students": [
            "Ocean Man 1",
            "Careless Whisper 2",
            "Allstar 3"
        ]
    },
    "function": {
        "functionName": "postFeedback",
        "functionParameters": {
            "address": "Allstar 3",
            "feedback": "feedback"
        }
    },
    "classTemplate": {
        "contract": "class ReviewContract {\n  // The IPFS hash of the file that needs to be reviewed\n  // The owner address of the contract\n  // An array of student addresses that are allowed\n  // to review the file\n  // Anonymous feedback\n  constructor(hash, teacher, students) {\n    this.ipfsHash = void 0;\n    this.teacher = void 0;\n    this.students = void 0;\n    this.feedback = void 0;\n    this.ipfsHash = hash;\n    this.teacher = teacher;\n    this.students = students;\n    this.feedback = [];\n  }\n\n  postFeedback(address, feedback) {\n    if (!this.students.includes(address)) return \"Only students can review this\";\n    this.feedback.push(feedback);\n  }\n\n  getFeedback(address) {\n    if (this.teacher !== address) return \"Only the teacher can fetch feedback\";\n    return this.feedback;\n  }\n\n}"
    }
};

let executedContract = JSON.stringify({
    "constructor": "{\"ipfsHash\":\"IPFS Hash\",\"teacher\":\"Creator Address\",\"students\":[\"Ocean Man 1\",\"Careless Whisper 2\",\"Allstar 3\"],\"feedback\":[\"feedback\"]}",
    "classTemplate": {
        "contract": "class ReviewContract {\n  // The IPFS hash of the file that needs to be reviewed\n  // The owner address of the contract\n  // An array of student addresses that are allowed\n  // to review the file\n  // Anonymous feedback\n  constructor(hash, teacher, students) {\n    this.ipfsHash = void 0;\n    this.teacher = void 0;\n    this.students = void 0;\n    this.feedback = void 0;\n    this.ipfsHash = hash;\n    this.teacher = teacher;\n    this.students = students;\n    this.feedback = [];\n  }\n\n  postFeedback(address, feedback) {\n    if (!this.students.includes(address)) return \"Only students can review this\";\n    this.feedback.push(feedback);\n  }\n\n  getFeedback(address) {\n    if (this.teacher !== address) return \"Only the teacher can fetch feedback\";\n    return this.feedback;\n  }\n\n}"
    }
});

let contractFunction = JSON.stringify({"functions":[{"functionName":"constructor","parameters":["hash","teacher","students"]},{"functionName":"postFeedback","parameters":["address","feedback"]},{"functionName":"getFeedback","parameters":["address"]}]});
describe('executeContract',function () {
    it('should succeed', function () {
        let ctr = Executor.executeContract(contract);
        expect(ctr).not.toBeNull();
        expect(ctr).toMatch(executedContract);
    });
})

describe('getContractFunctions',function () {
    it('should succeed', function () {
        let fnc = Executor.getContractFunctions(contract);
        expect(fnc).not.toBeNull();
        expect(fnc).toMatch(contractFunction)
    })
})

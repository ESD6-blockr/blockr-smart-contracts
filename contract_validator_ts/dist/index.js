"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("./src/contracts/contract");
const serializer_1 = require("./src/serializer");
const executor_1 = require("./src/executor");
let contract = new contract_1.ReviewContract("IPFS_fafadsf1231f", "42133123", ["12312", "123213"]);
console.log(JSON.stringify(contract) + "\n\n");
console.log(JSON.stringify(contract_1.ReviewContract.toString()));
// 1. Register contract receiver (using other groups package)
// 2. Serializer -> desirilze ofzo het contract


let data = '{ "function": { "functionName": "constructor", "functionParameters": [ { "hash": "IPFS Hash", "teacher": "Creator Address", "students": [ "Ocean Man 1", "Careless Whisper 2", "Allstar 3" ] } ] }, "classTemplate": { "contract": "class ReviewContract {\n // The IPFS hash of the file that needs to be reviewed\n // The owner address of the contract\n // An array of student addresses that are allowed\n // to review the file\n // Anonymous feedback\n constructor(hash, teacher, students) {\n this.ipfsHash = void 0;\n this.teacher = void 0;\n this.students = void 0;\n this.feedback = void 0;\n this.ipfsHash = hash;\n this.teacher = teacher;\n this.students = students;\n this.feedback = [];\n }\n\n postFeedback(address, feedback) {\n if (!this.students.includes(address)) return \"Only students can review this\";\n this.feedback.push(feedback);\n }\n\n getFeedback(address) {\n if (this.teacher !== address) return \"Only the teacher can fetch feedback\";\n return this.feedback;\n }\n\n}" } }';
const serializer = new serializer_1.Serialize;
let parsedJSON = serializer.deserialize(data);
// 3. Erachter komen wat er uitgevoerd moet worden en dat dan ook doen
const executor = new executor_1.Executor;
executor.executeContract(parsedJSON);
// 4. Serializer -> serializeer het contract
// 5. Stuur contract terug naar validator
//# sourceMappingURL=index.js.map
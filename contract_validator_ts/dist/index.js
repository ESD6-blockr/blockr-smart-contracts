"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("./src/serializer");
// console.log(JSON.stringify(contract) + "")
// console.log(JSON.stringify(ReviewContract.toString()))
// 1. Register contract receiver (using other groups package)
// 2. Serializer -> desirilze ofzo het contract
let data = '{ "function": { "functionName": "constructor", "functionParameters": [ { "hash": "IPFS Hash", "teacher": "Creator Address", "students": [ "Ocean Man 1", "Careless Whisper 2", "Allstar 3" ] } ] }, "classTemplate": { "contract": "class ReviewContract { // The IPFS hash of the file that needs to be reviewed // The owner address of the contract // An array of student addresses that are allowed // to review the file // Anonymous feedback constructor(hash, teacher, students) { this.ipfsHash = void 0; this.teacher = void 0; this.students = void 0; this.feedback = void 0; this.ipfsHash = hash; this.teacher = teacher; this.students = students; this.feedback = []; } postFeedback(address, feedback) { if (!this.students.includes(address)) return \'Only students can review this\'; this.feedback.push(feedback); } getFeedback(address) { if (this.teacher !== address) return \'Only the teacher can fetch feedback\'; return this.feedback; }}" } }';
const serializer = new serializer_1.Serialize;
let parsedJSON = serializer.deserialize(data);
let contractTemplate = eval('(' + parsedJSON.classTemplate.contract + ')');
// console.log(contractTemplate);
// let contract = new contractTemplate;
// // 3. Erachter komen wat er uitgevoerd moet worden en dat dan ook doen
// const executor = new Executor
// executor.executeContract(parsedJSON)
// 4. Serializer -> serializeer het contract
// 5. Stuur contract terug naar validator
//# sourceMappingURL=index.js.map
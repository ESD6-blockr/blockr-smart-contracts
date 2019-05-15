"use strict";
exports.__esModule = true;
var contract_1 = require("./src/contracts/contract");
var serializer_1 = require("./src/serializer");
var executor_1 = require("./src/executor");
var contract = new contract_1.ReviewContract("IPFS_fafadsf1231f", "42133123", ["12312", "123213"]);
console.log(JSON.stringify(contract));
// 1. Register contract receiver (using other groups package)
// 2. Serializer -> desirilze ofzo het contract
var data = '{ "functionName":"constructor", "functionParameters" : [ "ipfs", "owner address", [ "address1", "address2", "address3" ] ], "contract":"{class ReviewContract { // The IPFS hash of the file that needs to be reviewed // The owner address of the contract // An array of student addresses that are allowed // to review the file // Anonymous feedback constructor(hash, teacher, students) { this.ipfsHash = void 0; this.teacher = void 0; this.students = void 0; this.feedback = void 0; this.ipfsHash = hash; this.teacher = teacher; this.students = students; this.feedback = []; } postFeedback(address, feedback) { if (!this.students.includes(address)) return Only students can review this; this.feedback.push(feedback); } getFeedback(address) { if (this.teacher !== address) return Only the teacher can fetch feedback; return this.feedback; }}}"}';
var serializer = new serializer_1.Serialize;
var parsedJSON = serializer.deserialize(data);
// 3. Erachter komen wat er uitgevoerd moet worden en dat dan ook doen
var executor = new executor_1.Executor;
executor.executeContract(parsedJSON);
// 4. Serializer -> serializeer het contract
// 5. Stuur contract terug naar validator

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("./src/contracts/contract");
let contract = new contract_1.ReviewContract("IPFS_fafadsf1231f", "42133123", ["12312", "123213"]);
console.log(JSON.stringify(contract));
// 1. Register contract receiver (using other groups package)
// 2. Serializer -> desirilze ofzo het contract
// 3. Erachter komen wat er uitgevoerd moet worden en dat dan ook doen
// 4. Serializer -> serializeer het contract
// 5. Stuur contract terug naar validator
//# sourceMappingURL=index.js.map
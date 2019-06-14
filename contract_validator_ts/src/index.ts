import "reflect-metadata";
import {IPeer, Message, Peer, PeerType} from "@blockr/blockr-p2p-lib";
import {RESPONSE_TYPE} from "@blockr/blockr-p2p-lib/dist/interfaces/peer";
import {Executor} from "./executor";
import {pairs} from "./contractString";
import {requestValidator} from "./api-calls";

let peer: IPeer;

async function startPeer() {
    peer = new Peer(PeerType.SMART_CONTRACT_ENGINE);

    await peer.init(["145.93.164.143"], "8082");
    await peer.registerReceiveHandlerForMessageType("wallet_getFunctions", async (message: Message, senderGuid: string, response: RESPONSE_TYPE) => {
        if (message && senderGuid) {
            let contract = pairs[message.body];
            message.body = Executor.getContractFunctions(contract);
            response(message);
        }
    });

    await peer.registerReceiveHandlerForMessageType("wallet_executeFunction", async (message: Message, senderGuid: string, response: RESPONSE_TYPE) => {
        if (message && senderGuid) {
            let contract = message.body;
            message.body = Executor.executeContract(contract);
            response(message);
        }
    });

    await peer.registerReceiveHandlerForMessageType("ipfs_getAllHashes", async (message: Message, senderGuid: string, response: RESPONSE_TYPE) => {
        if (message && senderGuid) {
            //todo get contracts from validator
            let contracts: any[] = [];
            let hashes: string[] = [];
            for (let contract in contracts) {
                let contractObj: object = Executor.rebuildContract(contract, false);
                hashes.push(Executor.getHash(contractObj));
            }
            let returnMessage = new Message("engine_hashes",)
        }
        response(message);
    });
}

console.log(requestValidator());

// startPeer().then(() => {
//     console.log("engine ready");
// });



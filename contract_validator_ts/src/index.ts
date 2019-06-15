import "reflect-metadata";
import {IPeer, Message, Peer, PeerType} from "@blockr/blockr-p2p-lib";
import {RESPONSE_TYPE} from "@blockr/blockr-p2p-lib/dist/interfaces/peer";
import {Executor} from "./executor";
import {data, data2, pairs} from "./contractString";
import {getContract} from "./api-calls";
import {hasOwnProperty} from "tslint/lib/utils";

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
            let contract = JSON.parse(message.body);
            message.body = Executor.executeContract(contract);
            response(message);
        }
    });

    await peer.registerReceiveHandlerForMessageType("wallet_getAllHashes", async (message: Message, senderGuid: string, response: RESPONSE_TYPE) => {
        if (message && senderGuid) {
            getContract().then(res => {
                let transactions = JSON.parse(res);
                let hashes: any[] = [];
                for(let transaction of transactions) {
                    hashes.push(Executor.rebuildContract(JSON.parse(transaction["transactionHeader"]["smartContractData"]),false)["ipfsHash"])
                }
                message.body = JSON.stringify(hashes);
                response(message);
            });
        }
    });
}

startPeer().then(() => {
    console.log("engine ready");
});



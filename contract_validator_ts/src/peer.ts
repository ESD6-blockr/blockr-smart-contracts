import "reflect-metadata";
import {IPeer, Message, Peer, PeerType} from "@blockr/blockr-p2p-lib";
import {RESPONSE_TYPE} from "@blockr/blockr-p2p-lib/dist/interfaces/peer";

export async function createPeer() {

    console.log('createPeer');

    let peer: IPeer;
    peer = new Peer(PeerType.SMART_CONTRACT_ENGINE);

    await peer.init("8081", ["145.93.164.122"]);
    await peer.registerReceiveHandlerForMessageType("testMessageType", async (message: Message, senderGuid: string) => {
        if (message && senderGuid) {
            console.log("message", message);
        }
    });

    await peer.registerReceiveHandlerForMessageType("walletMessage", async (message: Message, senderGuid: string, response: RESPONSE_TYPE) => {
        if (message && senderGuid) {
            console.log("messageWreturn", message);
            response(message);
        }
    });


    const validator = peer.getPeerOfType(PeerType.SMART_CONTRACT_ENGINE);
    console.log('validator', validator);

    if(validator) {
        peer.sendMessageAsync(new Message("testMessageType", "hoi"), validator[0]);
    }
}

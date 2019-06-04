import "reflect-metadata";
import {IPeer, Message, Peer, PeerType} from "@blockr/blockr-p2p-lib";
import {RESPONSE_TYPE} from "@blockr/blockr-p2p-lib/dist/interfaces/peer";

export async function createPeer() {

    console.log('createPeer');

    let peer: IPeer;
    peer = new Peer(PeerType.SMART_CONTRACT_ENGINE);

    await peer.init("8081", ["0.0.0.0"]);
    await peer.registerReceiveHandlerForMessageType("testMessageType", async (message: Message, senderGuid: string) => {
        if (message && senderGuid) {
            console.log("message", message);
        }
    });

    await peer.registerReceiveHandlerForMessageType("testMessageType", async (message: Message, senderGuid: string, response: RESPONSE_TYPE) => {
        if (message && senderGuid) {
            console.log("messageWreturn", message);
            response(message);
        }
    });

    console.log(peer);

    const engine = peer.getPeerOfType(PeerType.SMART_CONTRACT_ENGINE);
    console.log('engine', engine);

    if(engine) {
        let message = new Message("testMessageType", "testMessageType");

        await peer.sendMessageAsync(message, engine[0]);
        await peer.sendBroadcastAsync(message);
    }
}

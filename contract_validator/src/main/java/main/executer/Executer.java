package main.executer;

import org.ethereum.util.RLP;
import org.ethereum.util.RLPElement;

import java.util.List;

public class Executer {
    private byte[] rawData;

    public Executer(byte[] rawData) {
        this.rawData = rawData;
        List<RLPElement> transaction = RLP.decodeList(rawData);

    }
}

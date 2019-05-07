package main.executer;

import main.contracts.IContract;

import java.io.*;
import java.util.List;

public class Executer {

    private IContract contract;

    public Executer(byte[] contract) throws IOException, ClassNotFoundException {

        this.contract = this.deserializeContract(contract);

        //Run the contract constructor
        this.contract.initialize();

    }

    private IContract deserializeContract(byte[] contract) throws IOException, ClassNotFoundException {

        ByteArrayInputStream bis = new ByteArrayInputStream(contract);

        ObjectInput in = new ObjectInputStream(bis);

        return (IContract)in.readObject();

    }
}

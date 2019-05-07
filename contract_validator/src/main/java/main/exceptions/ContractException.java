package main.exceptions;

public class ContractException extends Exception {
    public ContractException(String errorMessage) {
        super(errorMessage);
    }
}

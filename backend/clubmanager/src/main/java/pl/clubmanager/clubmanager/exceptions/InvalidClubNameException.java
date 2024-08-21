package pl.clubmanager.clubmanager.exceptions;

public class InvalidClubNameException extends RuntimeException {
    public InvalidClubNameException(String message) {
        super(message);
    }
}

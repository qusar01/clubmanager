package pl.clubmanager.clubmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<Map<String, String>> handleLoginException(InvalidEmailException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("email", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Map<String, String>> handlePasswordException(InvalidPasswordException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("password", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidFirstNameException.class)
    public ResponseEntity<Map<String, String>> handleFirstNameException(InvalidFirstNameException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("firstName", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidLastNameException.class)
    public ResponseEntity<Map<String, String>> handleLastNameException(InvalidLastNameException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("lastName", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPhoneNumberException.class)
    public ResponseEntity<Map<String, String>> handlePhoneNumberException(InvalidPhoneNumberException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("phoneNumber", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidClubNipException.class)
    public ResponseEntity<Map<String, String>> handleClubNipException(InvalidClubNipException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("clubNip", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidClubNameException.class)
    public ResponseEntity<Map<String, String>> handleClubNameException(InvalidClubNameException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("clubName", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidVerificationCodeException.class)
    public ResponseEntity<Map<String, String>> handleVerificationCodeException(InvalidVerificationCodeException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("verificationCode", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}

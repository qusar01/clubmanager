package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterMemberDto {

    @Valid

    @Size(min = 2, message = "Imię musi mieć co najmniej 2 znaki.")
    @Size(max = 50, message = "Imię nie może mieć więcej niż 50 znaków.")
    @Pattern(
            regexp = "^[^\\d]*$",
            message = "Niepoprawne imię."
    )
    private String firstName;

    @Size(min = 2, message = "Nazwisko musi mieć co najmniej 2 znaki.")
    @Size(max = 50, message = "Nazwisko nie może mieć więcej niż 50 znaków.")
    @Pattern(
            regexp = "^[^\\d]*$",
            message = "Niepoprawne nazwisko."
    )
    private String lastName;

    @Email(message = "Niepoprawny email.")
    @NotBlank(message = "Email nie może być pusty.")
    private String email;

    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Hasło musi zawierać co najmniej 8 znaków, w tym jedną dużą literę, jedną cyfrę oraz jeden znak specjalny."
    )
    private String password;

    @Past(message = "Data urodzenia musi być z przeszłości.")
    @NotNull(message = "Data urodzenia nie może być pusta.")
    private LocalDate birthDate;

    @Pattern(
            regexp = "^[0-9]{9}$",
            message = "Niepoprawny numer telefonu."
    )
    private String phoneNumber;

    private Long clubId;

    private String role;
}

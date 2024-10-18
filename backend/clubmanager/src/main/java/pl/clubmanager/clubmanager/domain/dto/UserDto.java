package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.clubmanager.clubmanager.enums.Role;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    @Valid

    private Long id;

    @Size(min = 2, message = "Imię musi mieć co najmniej 2 znaki")
    @Size(max = 50, message = "Imię nie może mieć więcej niż 50 znaków")
    @Pattern(
            regexp = "^[^\\d]*$",
            message = "Niepoprawne imię."
    )
    private String firstName;

    @Size(min = 2, message = "Nazwisko musi mieć co najmniej 2 znaki")
    @Size(max = 50, message = "Nazwisko nie może mieć więcej niż 50 znaków")
    @Pattern(
            regexp = "^[^\\d]*$",
            message = "Niepoprawne nazwisko."
    )
    private String lastName;

    private String email;

    private String password;

    private Role role;

}

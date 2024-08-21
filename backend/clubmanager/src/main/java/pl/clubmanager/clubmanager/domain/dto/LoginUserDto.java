package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginUserDto {

    @Valid

    @NotBlank(message = "Email nie może być pusty")
    private String email;

    @NotBlank(message = "Niepoprawne hasło")
    private String password;
}

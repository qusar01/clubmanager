package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubDto {

        @Valid

        private Long id;

        @Size(min = 9, message = "Niepoprawny numer.")
        @Size(max = 9, message = "Niepoprawny numer.")
        private String phoneNumber;

        @Size(min = 10, message = "Niepoprawny numer.")
        @Size(max = 10, message = "Niepoprawny numer.")
        private String clubNip;

        @Pattern(
                regexp = "^[^\\d]*$",
                message = "Niepoprawna nazwa klubu."
        )
        @Size(min = 3, message = "Niepoprawna nazwa klubu.")
        @Size(max = 50, message = "Niepoprawna nazwa klubu.")
        private String clubName;

        private UserDto owner;

}

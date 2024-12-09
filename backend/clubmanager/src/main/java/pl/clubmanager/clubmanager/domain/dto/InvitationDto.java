package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvitationDto {

    @Valid

    private Long id;

    @NotBlank(message = "Email nie może być pusty.")
    private String email;

    private Long clubId;

    private String role;
}

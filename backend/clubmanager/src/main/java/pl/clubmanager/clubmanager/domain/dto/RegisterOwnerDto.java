package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterOwnerDto {

    @Valid
    private RegisterUserDto registerUserDto;

    @Valid
    private ClubDto clubDto;
}

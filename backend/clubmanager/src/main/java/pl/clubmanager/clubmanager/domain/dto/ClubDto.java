package pl.clubmanager.clubmanager.domain.dto;

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

        private Long id;

        private int phoneNumber;

        private int clubNip;

        private String clubName;

        private UserDto owner;

        private List<UserDto> users;
}

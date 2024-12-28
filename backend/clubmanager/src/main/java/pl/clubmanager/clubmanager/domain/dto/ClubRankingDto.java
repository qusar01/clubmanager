package pl.clubmanager.clubmanager.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubRankingDto {
    private Long memberId;
    private String firstName;
    private String lastName;
    private Long attendanceCount;
}

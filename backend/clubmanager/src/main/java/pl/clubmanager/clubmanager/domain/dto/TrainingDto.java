package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrainingDto {

    private Long id;

    private String title;
    private String description;

    private Date startTime;
    private Date endTime;

    private Long clubId;

    private Long coachId;
}

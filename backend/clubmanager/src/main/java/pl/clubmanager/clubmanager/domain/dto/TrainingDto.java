package pl.clubmanager.clubmanager.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @Valid

    private Long id;

    @NotBlank(message = "Tytuł nie może być pusty.")
    private String title;

    private String description;

    @Future(message = "Data musi być w przyszłości.")
    @NotNull(message = "Data nie może być pusta.")
    private Date startTime;

    @Future(message = "Data musi być w przyszłości.")
    @NotNull(message = "Data nie może być pusta.")
    private Date endTime;

    private Long clubId;

    private Long coachId;
}

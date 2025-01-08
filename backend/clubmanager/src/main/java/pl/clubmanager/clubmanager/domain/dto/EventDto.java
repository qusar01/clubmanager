package pl.clubmanager.clubmanager.domain.dto;


import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
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
public class EventDto {

    @Valid

    private Long id;

    @NotNull(message = "Tytuł nie może być pusty.")
    private String title;

    @NotNull(message = "Opis nie może być pusty.")
    private String description;

    @NotNull(message = "Adres nie może być pusty.")
    private String location;

    @Future(message = "Data rozpoczęcia musi być z przyszłości.")
    @NotNull(message = "Data rozpoczęcia nie może być pusta.")
    private Date startTime;

    @Future(message = "Data zakończenia musi być z przyszłości.")
    @NotNull(message = "Data zakończenia nie może być pusta.")
    private Date endTime;

    private Long clubId;

    private Long coachId;

}

package pl.clubmanager.clubmanager.domain.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity(name = "events")
public class EventEntity extends ScheduleItemEntity{

    private String location;

    @ManyToOne
    private ClubEntity club;

    @ManyToOne
    private UserEntity coach;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<AttendanceEntity> attendances = new ArrayList<>();
}

package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.AttendanceEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface AttendanceRepository extends CrudRepository<AttendanceEntity, Long> {

    List<AttendanceEntity> findByUserId(Long userId);

    List<AttendanceEntity> findByTrainingId(Long trainingId);

    List<AttendanceEntity> findByEventId(Long eventId);

}

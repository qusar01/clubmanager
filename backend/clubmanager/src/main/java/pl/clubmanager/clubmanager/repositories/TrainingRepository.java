package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.TrainingEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface TrainingRepository extends CrudRepository<TrainingEntity, Long> {

    List<TrainingEntity> findByClubId(Long clubId);

    List<TrainingEntity> findByCoachId(Long coachId);

    List<TrainingEntity> findByStartTimeBetween(Date start, Date end);

    List<TrainingEntity> findByClubIdAndStartTimeBetween(Long clubId, Date start, Date end);

    @Query("SELECT t FROM trainings t " +
            "WHERE t.club.id = :clubId " +
            "AND t.startTime <= :now " +
            "AND t.endTime >= :now " +
            "AND NOT EXISTS ( " +
            "   SELECT a FROM attendances a " +
            "   WHERE a.training = t " +
            "   AND a.user.id = :userId " +
            ")")
    List<TrainingEntity> findActiveTrainingsForUser(Long clubId, Long userId, Date now);

}

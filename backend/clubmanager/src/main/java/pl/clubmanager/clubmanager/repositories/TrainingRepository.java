package pl.clubmanager.clubmanager.repositories;

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
}

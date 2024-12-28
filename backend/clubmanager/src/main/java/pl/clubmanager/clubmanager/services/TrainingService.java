package pl.clubmanager.clubmanager.services;


import pl.clubmanager.clubmanager.domain.entities.TrainingEntity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TrainingService {

    TrainingEntity save(TrainingEntity trainingEntity);
    boolean isExists(Long id);
    void delete(Long id);

    List<TrainingEntity> findAll();

    Optional<TrainingEntity> findById(Long id);

    List<TrainingEntity> findByCoachId(Long id);

    List<TrainingEntity> findByClubId(Long clubId);

    List<TrainingEntity> findByStartTimeBetween(Date start, Date end);

    List<TrainingEntity> getTrainingsForCurrentMonth(Long clubId);
}


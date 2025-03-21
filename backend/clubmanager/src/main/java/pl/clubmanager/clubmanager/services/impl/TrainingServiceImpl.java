package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.TrainingEntity;
import pl.clubmanager.clubmanager.repositories.TrainingRepository;
import pl.clubmanager.clubmanager.services.TrainingService;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class TrainingServiceImpl implements TrainingService {

    private TrainingRepository trainingRepository;

    public TrainingServiceImpl(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    @Override
    public TrainingEntity save(TrainingEntity trainingEntity) { return trainingRepository.save(trainingEntity); }

    @Override
    public boolean isExists(Long id) {
        return trainingRepository.existsById(id);
    }

    @Override
    public void delete(Long id) {
        trainingRepository.deleteById(id);
    }

    @Override
    public List<TrainingEntity> findAll() {
        return StreamSupport.stream(trainingRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TrainingEntity> findById(Long id) {
        return trainingRepository.findById(id);
    }

    @Override
    public List<TrainingEntity> findByCoachId(Long id) {
        return trainingRepository.findByCoachId(id);
    }

    @Override
    public List<TrainingEntity> findByClubId(Long clubId) {
        return trainingRepository.findByClubId(clubId);
    }

    @Override
    public List<TrainingEntity> findByStartTimeBetween(Date start, Date end) {
        return trainingRepository.findByStartTimeBetween(start, end);
    }

    @Override
    public List<TrainingEntity> getTrainingsForCurrentMonth(Long clubId) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date start = calendar.getTime();

        calendar.add(Calendar.MONTH, 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date end = calendar.getTime();

        return trainingRepository.findByClubIdAndStartTimeBetween(clubId, start, end);
    }

    @Override
    public List<TrainingEntity> getActiveTrainings(Long clubId, Long userId) {
        Date now = new Date();
        return trainingRepository.findActiveTrainingsForUser(clubId, userId, now);
    }
}

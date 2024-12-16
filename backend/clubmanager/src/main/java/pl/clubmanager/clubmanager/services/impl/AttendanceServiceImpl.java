package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.entities.AttendanceEntity;
import pl.clubmanager.clubmanager.repositories.AttendanceRepository;
import pl.clubmanager.clubmanager.services.AttendanceService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private AttendanceRepository attendanceRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public AttendanceEntity save(AttendanceEntity attendanceEntity) {
        return attendanceRepository.save(attendanceEntity);
    }

    @Override
    public boolean isExists(Long id) {
        return attendanceRepository.existsById(id);
    }

    @Override
    public void delete(Long id) {
        attendanceRepository.deleteById(id);
    }

    @Override
    public List<AttendanceEntity> findAll() {
        return StreamSupport.stream(attendanceRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AttendanceEntity> findById(Long id) {
        return attendanceRepository.findById(id);
    }

    @Override
    public List<AttendanceEntity> findByUserId(Long id) {
        return attendanceRepository.findByUserId(id);
    }

    @Override
    public List<AttendanceEntity> findByTrainingId(Long id) {
        return attendanceRepository.findByTrainingId(id);
    }

    @Override
    public List<AttendanceEntity> findByEventId(Long id) {
        return attendanceRepository.findByEventId(id);
    }
}

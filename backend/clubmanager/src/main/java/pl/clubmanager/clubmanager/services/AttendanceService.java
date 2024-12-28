package pl.clubmanager.clubmanager.services;

import pl.clubmanager.clubmanager.domain.dto.ClubRankingDto;
import pl.clubmanager.clubmanager.domain.entities.AttendanceEntity;

import java.util.List;
import java.util.Optional;

public interface AttendanceService {

    AttendanceEntity save(AttendanceEntity attendanceEntity);
    boolean isExists(Long id);
    void delete(Long id);

    List<AttendanceEntity> findAll();

    Optional<AttendanceEntity> findById(Long id);

    List<AttendanceEntity> findByUserId(Long id);

    List<AttendanceEntity> findByTrainingId(Long id);

    List<AttendanceEntity> findByEventId(Long id);

    List<AttendanceEntity> getAttendancesForUserInCurrentMonth(Long userId);

    List<ClubRankingDto> getRankngForClub(Long clubId);
}

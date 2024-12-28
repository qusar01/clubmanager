package pl.clubmanager.clubmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.clubmanager.clubmanager.domain.entities.AttendanceEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface AttendanceRepository extends CrudRepository<AttendanceEntity, Long> {

    List<AttendanceEntity> findByUserId(Long userId);

    List<AttendanceEntity> findByTrainingId(Long trainingId);

    List<AttendanceEntity> findByEventId(Long eventId);

    @Query("SELECT a FROM attendances a JOIN a.training t WHERE a.user.id = :userId AND t.startTime BETWEEN :start AND :end")
    List<AttendanceEntity> findAttendancesForUserAndMonthInTrainings(Long userId, Date start, Date end);

    @Query("SELECT a FROM attendances a JOIN a.event e WHERE a.user.id = :userId AND e.startTime BETWEEN :start AND :end")
    List<AttendanceEntity> findAttendancesForUserAndMonthInEvents(Long userId, Date start, Date end);

    @Query("""
           SELECT a.user.id, a.user.firstName, a.user.lastName, COUNT(a)
           FROM attendances a
           LEFT JOIN a.training t
           LEFT JOIN a.event e
           WHERE 
               (t IS NOT NULL AND t.club.id = :clubId AND t.startTime BETWEEN :start AND :end) OR
               (e IS NOT NULL AND e.club.id = :clubId AND e.startTime BETWEEN :start AND :end)
           GROUP BY a.user.id
           ORDER BY COUNT(a) DESC
           """)
    List<Object[]> getRankingForClub(@Param("clubId") Long clubId, @Param("start") Date start, @Param("end") Date end);

}

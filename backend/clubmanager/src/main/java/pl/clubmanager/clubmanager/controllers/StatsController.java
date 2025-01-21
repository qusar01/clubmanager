package pl.clubmanager.clubmanager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.clubmanager.clubmanager.domain.dto.*;
import pl.clubmanager.clubmanager.domain.entities.*;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/stats")
@RestController
public class StatsController {

    private ClubService clubService;

    private TrainingService trainingService;

    private EventService eventService;

    private AttendanceService attendanceService;

    private UserService userService;

    private Mapper<ClubEntity, ClubDto> clubMapper;

    private Mapper<TrainingEntity, TrainingDto> trainingMapper;

    private Mapper<EventEntity, EventDto> eventMapper;

    private Mapper<AttendanceEntity, AttendanceDto> attendanceMapper;

    private Mapper<UserEntity, UserDto> userMapper;

    public StatsController(ClubService clubService, TrainingService trainingService, EventService eventService, AttendanceService attendanceService, UserService userService, Mapper<ClubEntity, ClubDto> clubMapper, Mapper<TrainingEntity, TrainingDto> trainingMapper, Mapper<EventEntity, EventDto> eventMapper, Mapper<AttendanceEntity, AttendanceDto> attendanceMapper, Mapper<UserEntity, UserDto> userMapper) {
        this.clubService = clubService;
        this.trainingService = trainingService;
        this.eventService = eventService;
        this.attendanceService = attendanceService;
        this.userService = userService;
        this.clubMapper = clubMapper;
        this.trainingMapper = trainingMapper;
        this.eventMapper = eventMapper;
        this.attendanceMapper = attendanceMapper;
        this.userMapper = userMapper;
    }

    @GetMapping("/user/{id}")
    public UserStatsDto getUserStats(@PathVariable Long id) {
        Optional<ClubEntity> club = clubService.findByUserId(id);
        int trainings = 0;
        int events = 0;

        if(club.isPresent()) {
            trainings = trainingService.getTrainingsForCurrentMonth(club.get().getId()).size();
            events = eventService.getEventsForCurrentMonth(club.get().getId()).size();
        }

        int attendances = attendanceService.getAttendancesForUserInCurrentMonth(id).size();

        return UserStatsDto.builder()
                .trainings(trainings)
                .events(events)
                .attendances(attendances)
                .build();
    }

    @GetMapping("/club/{id}")
    public List<ClubRankingDto> getRankingForClub(@PathVariable Long id) {
        return clubService.getRankingForClub(id);
    }

}

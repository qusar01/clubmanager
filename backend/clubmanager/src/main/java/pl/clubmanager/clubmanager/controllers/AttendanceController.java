package pl.clubmanager.clubmanager.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.clubmanager.clubmanager.domain.dto.AttendanceDto;
import pl.clubmanager.clubmanager.domain.entities.AttendanceEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.AttendanceService;

@RequestMapping("/attendance")
@RestController
public class AttendanceController {

    private AttendanceService attendanceService;

    private Mapper<AttendanceEntity, AttendanceDto> attendanceMapper;

    public AttendanceController(AttendanceService attendanceService, Mapper<AttendanceEntity, AttendanceDto> attendanceMapper) {
        this.attendanceService = attendanceService;
        this.attendanceMapper = attendanceMapper;
    }

    @PostMapping
    public AttendanceDto createAttendance(@RequestBody AttendanceDto attendance) {
        AttendanceEntity attendanceEntity = attendanceMapper.mapFrom(attendance);
        AttendanceEntity savedAttendanceEntity = attendanceService.save(attendanceEntity);
        return attendanceMapper.mapTo(savedAttendanceEntity);
    }
}

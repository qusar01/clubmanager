package pl.clubmanager.clubmanager.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.dto.TrainingDto;
import pl.clubmanager.clubmanager.domain.entities.TrainingEntity;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.services.TrainingService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("/trainings")
@RestController
public class TrainingController {

    private TrainingService trainingService;

    private Mapper<TrainingEntity, TrainingDto> trainingMapper;

    public TrainingController(TrainingService trainingService, Mapper<TrainingEntity, TrainingDto> trainingMapper) {
        this.trainingService = trainingService;
        this.trainingMapper = trainingMapper;
    }

    @PostMapping
    public TrainingDto createTraining(@Valid @RequestBody TrainingDto trainingDto) {
        TrainingEntity trainingEntity = trainingMapper.mapFrom(trainingDto);
        TrainingEntity savedTrainingEntity = trainingService.save(trainingEntity);
        return trainingMapper.mapTo(savedTrainingEntity);
    }

    @GetMapping
    public List<TrainingDto> listTrainings() {
        List<TrainingEntity> trainings = trainingService.findAll();
        return trainings.stream().map(trainingMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/club/{id}")
    public List<TrainingDto> listClubTrainings(@PathVariable("id") Long id){
        List<TrainingEntity> trainings = trainingService.findByClubId(id);
        return trainings.stream().map(trainingMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/coach/{id}")
    public List<TrainingDto> listCoachTrainings(@PathVariable("id") Long id){
        List<TrainingEntity> trainings = trainingService.findByCoachId(id);
        return trainings.stream().map(trainingMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/club/{clubId}/user/{userId}")
    public List<TrainingDto> listActiveTrainings(@PathVariable("clubId") Long clubId, @PathVariable("userId") Long userId){
        List<TrainingEntity> trainings = trainingService.getActiveTrainings(clubId, userId);
        return trainings.stream().map(trainingMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TrainingDto> getTraining(@PathVariable("id") Long id) {
        Optional<TrainingEntity> training = trainingService.findById(id);
        return training.map(trainingEntity -> {
            TrainingDto trainingDto = trainingMapper.mapTo(trainingEntity);
            return new ResponseEntity<>(trainingDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TrainingDto> fullUpdateTraining(@PathVariable("id") Long id, @RequestBody TrainingDto trainingDto) {
        if(!trainingService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        trainingDto.setId(id);
        TrainingEntity trainingEntity = trainingMapper.mapFrom(trainingDto);
        TrainingEntity updatedTrainingEntity = trainingService.save(trainingEntity);

        return new ResponseEntity<>(trainingMapper.mapTo(updatedTrainingEntity), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<TrainingDto> deleteTraining(@PathVariable("id") Long id) {
        if(!trainingService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        trainingService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

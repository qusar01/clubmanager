package pl.clubmanager.clubmanager.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import pl.clubmanager.clubmanager.domain.dto.*;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.exceptions.InvalidVerificationCodeException;
import pl.clubmanager.clubmanager.mappers.Mapper;
import pl.clubmanager.clubmanager.responses.LoginResponse;
import pl.clubmanager.clubmanager.services.ClubService;
import pl.clubmanager.clubmanager.services.impl.AuthenticationService;
import pl.clubmanager.clubmanager.services.impl.JwtService;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private ClubService clubService;

    private Mapper<ClubEntity, ClubDto> clubMapper;

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(ClubService clubService, Mapper<ClubEntity, ClubDto> clubMapper, JwtService jwtService, AuthenticationService authenticationService) {
        this.clubService = clubService;
        this.clubMapper = clubMapper;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<UserEntity> register(@Valid @RequestBody RegisterOwnerDto registerOwnerDto) {
        UserEntity user = authenticationService.signup(registerOwnerDto.getRegisterUserDto());
        ClubEntity clubEntity = clubMapper.mapFrom(registerOwnerDto.getClubDto());
        clubEntity.setOwner(user);
        clubService.save(clubEntity);
        authenticationService.sendVerificationEmail(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/signup-member")
    @Transactional
    public ResponseEntity<UserEntity> registerMember(@Valid @RequestBody RegisterMemberDto registerMemberDto) {
        UserEntity user = authenticationService.signupMember(registerMemberDto);
        clubService.addMember(registerMemberDto.getClubId(), user.getId());
        authenticationService.sendVerificationEmail(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
            UserEntity authenticatedUser = authenticationService.authenticate(loginUserDto);
            String token = jwtService.generateToken(authenticatedUser);
            LoginResponse loginResponse = new LoginResponse(token, jwtService.getJwtExpiration());
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        authenticationService.verifyUser(verifyUserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        authenticationService.forgotPassword(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/set-password")
    public ResponseEntity<?> setPassword(@RequestParam String email, @RequestHeader String password) {
        authenticationService.setPassword(email, password);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}

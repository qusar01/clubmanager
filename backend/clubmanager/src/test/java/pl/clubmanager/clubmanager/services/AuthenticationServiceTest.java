package pl.clubmanager.clubmanager.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.clubmanager.clubmanager.domain.dto.LoginUserDto;
import pl.clubmanager.clubmanager.domain.dto.RegisterUserDto;
import pl.clubmanager.clubmanager.domain.dto.VerifyUserDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.enums.Role;
import pl.clubmanager.clubmanager.exceptions.InvalidEmailException;
import pl.clubmanager.clubmanager.exceptions.InvalidVerificationCodeException;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.impl.AuthenticationService;
import pl.clubmanager.clubmanager.services.impl.EmailService;
import pl.clubmanager.clubmanager.utils.TestDataUtil;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private InvitationService invitationService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private EmailService emailService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterUserDto registerUserDto;
    private LoginUserDto loginUserDto;
    private UserEntity testUser;

    @BeforeEach
    void setUp() {
        registerUserDto = new RegisterUserDto();
        registerUserDto.setFirstName("John");
        registerUserDto.setLastName("Doe");
        registerUserDto.setEmail("john.doe@example.com");
        registerUserDto.setPassword("password123");
        registerUserDto.setBirthDate(LocalDate.of(1990, 1, 1));
        registerUserDto.setPhoneNumber("123456789");

        loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("john.doe@example.com");
        loginUserDto.setPassword("password123");

        testUser = TestDataUtil.createTestUserEntityA();
        testUser.setId(1L);
        testUser.setVerificationCode("TEST123");
    }

    @Test
    void signup_ShouldCreateNewUser_WhenEmailNotExists() throws Exception {
        // Given
        when(userRepository.findByEmail(registerUserDto.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(registerUserDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(UserEntity.class))).thenReturn(testUser);
        doNothing().when(emailService).sendVerificationEmail(anyString(), anyString(), anyString());

        // When
        UserEntity result = authenticationService.signup(registerUserDto);

        // Then
        assertNotNull(result);
        assertEquals(testUser.getId(), result.getId());
        verify(userRepository).findByEmail(registerUserDto.getEmail());
        verify(passwordEncoder).encode(registerUserDto.getPassword());
        verify(userRepository).save(any(UserEntity.class));
        verify(emailService).sendVerificationEmail(anyString(), anyString(), anyString());
    }

    @Test
    void signup_ShouldThrowException_WhenEmailAlreadyExists() {
        // Given
        when(userRepository.findByEmail(registerUserDto.getEmail())).thenReturn(Optional.of(testUser));

        // When & Then
        assertThrows(InvalidEmailException.class, () -> {
            authenticationService.signup(registerUserDto);
        });
        verify(userRepository).findByEmail(registerUserDto.getEmail());
        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void authenticate_ShouldReturnUser_WhenCredentialsValid() {
        // Given
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(userRepository.findByEmail(loginUserDto.getEmail())).thenReturn(Optional.of(testUser));

        // When
        UserEntity result = authenticationService.authenticate(loginUserDto);

        // Then
        assertNotNull(result);
        assertEquals(testUser.getEmail(), result.getEmail());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(loginUserDto.getEmail());
    }

    @Test
    void authenticate_ShouldThrowException_WhenUserNotFound() {
        // Given
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(userRepository.findByEmail(loginUserDto.getEmail())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            authenticationService.authenticate(loginUserDto);
        });
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(loginUserDto.getEmail());
    }

    @Test
    void verifyUser_ShouldEnableUser_WhenVerificationCodeValid() {
        // Given
        VerifyUserDto verifyUserDto = new VerifyUserDto();
        verifyUserDto.setEmail(testUser.getEmail());
        verifyUserDto.setVerificationCode("TEST123");

        testUser.setEnabled(false);
        testUser.setVerificationCode("TEST123");

        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        // When
        authenticationService.verifyUser(verifyUserDto);

        // Then
        verify(userRepository).findByEmail(testUser.getEmail());
        verify(userRepository).save(testUser);
    }

    @Test
    void verifyUser_ShouldThrowException_WhenVerificationCodeInvalid() {
        // Given
        VerifyUserDto verifyUserDto = new VerifyUserDto();
        verifyUserDto.setEmail(testUser.getEmail());
        verifyUserDto.setVerificationCode("INVALID");

        testUser.setVerificationCode("VALID123");

        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        // When & Then
        assertThrows(InvalidVerificationCodeException.class, () -> {
            authenticationService.verifyUser(verifyUserDto);
        });
        verify(userRepository).findByEmail(testUser.getEmail());
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    @Test
    void verifyUser_ShouldThrowException_WhenUserNotFound() {
        // Given
        VerifyUserDto verifyUserDto = new VerifyUserDto();
        verifyUserDto.setEmail("nonexistent@example.com");
        verifyUserDto.setVerificationCode("TEST123");

        when(userRepository.findByEmail(verifyUserDto.getEmail())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            authenticationService.verifyUser(verifyUserDto);
        });
        verify(userRepository).findByEmail(verifyUserDto.getEmail());
        verify(userRepository, never()).save(any(UserEntity.class));
    }
}
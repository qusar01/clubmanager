package pl.clubmanager.clubmanager.services.impl;

import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.dto.LoginUserDto;
import pl.clubmanager.clubmanager.domain.dto.RegisterUserDto;
import pl.clubmanager.clubmanager.domain.dto.VerifyUserDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.enums.Role;
import pl.clubmanager.clubmanager.exceptions.InvalidEmailException;
import pl.clubmanager.clubmanager.exceptions.InvalidPasswordException;
import pl.clubmanager.clubmanager.exceptions.InvalidVerificationCodeException;
import pl.clubmanager.clubmanager.repositories.UserRepository;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final EmailService emailService;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public UserEntity signup(RegisterUserDto registerUserDto) {
        userRepository.findByEmail(registerUserDto.getEmail())
                .ifPresent(user -> {
                    throw new InvalidEmailException("Użytkownik o podanym adresie email już istnieje");
                });

        UserEntity user = UserEntity.builder()
                .firstName(registerUserDto.getFirstName())
                .lastName(registerUserDto.getLastName())
                .email(registerUserDto.getEmail())
                .password(passwordEncoder.encode(registerUserDto.getPassword()))
                .build();
        user.setVerificationCode(generateVerificationCode());
        user.setEnabled(false);
        user.setRole(Role.OWNER);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public UserEntity authenticate(LoginUserDto loginUserDto) {
        UserEntity user = userRepository.findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new InvalidEmailException("Użytkownik o podanym adresie email nie istnieje"));

        if(!user.isEnabled()) {
            throw new InvalidEmailException("Użytownik nie jest zweryfikowany");
        }

        if(!passwordEncoder.matches(loginUserDto.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException("Niepoprawne hasło");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword())
        );
        return user;
    }

    public void verifyUser(VerifyUserDto verifyUserDto) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(verifyUserDto.getEmail());
        if(optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            if(user.getVerificationCode().equals(verifyUserDto.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                userRepository.save(user);
            } else {
                throw new InvalidVerificationCodeException("Niepoprawny kod weryfikacyjny");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void sendVerificationEmail(UserEntity user) {
        String subject = "Club Manager - Zweryfikuj swoje konto";
        String verificationCode = user.getVerificationCode();
        String text = "Twój kod weryfikacyjny to: " + verificationCode;
        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, text);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }

    public void forgotPassword(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailException("Użytkownik o podanym adresie email nie istnieje"));

        String subject = "Club Manager - Resetowanie hasła";
        try {
            emailService.sendForgotPasswordEmail(subject, email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void setPassword(String email, String password) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailException("Użytkownik o podanym adresie email nie istnieje"));

        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!password.matches(passwordPattern)) {
            throw new InvalidPasswordException("Hasło musi zawierać co najmniej 8 znaków, w tym jedną dużą literę, jedną cyfrę oraz jeden znak specjalny");
        }

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}

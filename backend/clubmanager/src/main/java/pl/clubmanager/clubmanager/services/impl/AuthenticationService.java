package pl.clubmanager.clubmanager.services.impl;

import jakarta.mail.MessagingException;
import org.apache.catalina.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.dto.LoginUserDto;
import pl.clubmanager.clubmanager.domain.dto.RegisterUserDto;
import pl.clubmanager.clubmanager.domain.dto.VerifyUserDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
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
        UserEntity user = UserEntity.builder()
                .firstName(registerUserDto.getFirstName())
                .lastName(registerUserDto.getLastName())
                .email(registerUserDto.getEmail())
                .password(passwordEncoder.encode(registerUserDto.getPassword()))
                .build();
        user.setVerificationCode(generateVerificationCode());
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public UserEntity authenticate(LoginUserDto loginUserDto) {
        UserEntity user = userRepository.findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.isEnabled()) {
            throw new RuntimeException("User not verified");
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
                throw new RuntimeException("Invalid verification code");
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
}

package pl.clubmanager.clubmanager.services.impl;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.dto.InvitationDto;
import pl.clubmanager.clubmanager.domain.entities.InvitationEntity;
import pl.clubmanager.clubmanager.exceptions.InvalidEmailException;
import pl.clubmanager.clubmanager.repositories.InvitationRepository;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.InvitationService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService {

    private InvitationRepository invitationRepository;

    private UserRepository userRepository;

    private EmailService emailService;

    public InvitationServiceImpl(InvitationRepository invitationRepository, UserRepository userRepository, EmailService emailService) {
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Override
    public InvitationEntity save(InvitationEntity invitation) {
        userRepository.findByEmail(invitation.getEmail())
                .ifPresent(userEntity -> {
                    throw new InvalidEmailException("Użytkownik o podanym adresie email już istnieje");
                });

        invitationRepository.findByEmail(invitation.getEmail())
                .ifPresent(invitation1 -> {
                    throw new InvalidEmailException("Zaproszenie dla podanego adresu email już istnieje");
                });

        return invitationRepository.save(invitation);
    }

    @Override
    public InvitationEntity invite(InvitationDto invitationDto) {
        userRepository.findByEmail(invitationDto.getEmail())
                .ifPresent(userEntity -> {
                    throw new InvalidEmailException("Użytkownik o podanym adresie email już istnieje");
                });

        invitationRepository.findByEmail(invitationDto.getEmail())
                .ifPresent(invitation1 -> {
                    throw new InvalidEmailException("Zaproszenie dla podanego adresu email już istnieje");
                });

        InvitationEntity invitationEntity = InvitationEntity.builder()
                .email(invitationDto.getEmail())
                .clubId(invitationDto.getClubId())
                .role(invitationDto.getRole())
                .token(UUID.randomUUID().toString())
                .expiryDate(LocalDateTime.now().plusHours(12))
                .build();
        sendInvitationEmail(invitationEntity);
        return invitationRepository.save(invitationEntity);
    }

    public void sendInvitationEmail(InvitationEntity invitation) {
        String subject = "Club Manager - Dołącz do klubu";
        String link = "http://localhost:3000/invite?token=" + invitation.getToken();
        try {
            emailService.sendInvitationEmail(invitation.getEmail(), subject, link);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


    @Override
    public InvitationEntity validateToken(String token) {
        return invitationRepository.findByToken(token)
                .orElseThrow(() -> new InvalidEmailException("Token wygasł lub jest nieprawidłowy"));
    }

    @Override
    public void delete(Long id) {
        invitationRepository.deleteById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return invitationRepository.existsById(id);
    }
}

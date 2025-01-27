package pl.clubmanager.clubmanager.services.impl;

import org.springframework.stereotype.Service;
import pl.clubmanager.clubmanager.domain.dto.ClubRankingDto;
import pl.clubmanager.clubmanager.domain.dto.PaymentSettingsDTO;
import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.exceptions.InvalidClubNameException;
import pl.clubmanager.clubmanager.exceptions.InvalidClubNipException;
import pl.clubmanager.clubmanager.exceptions.InvalidPhoneNumberException;
import pl.clubmanager.clubmanager.repositories.ClubRepository;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.ClubService;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ClubServiceImpl implements ClubService {

    private ClubRepository clubRepository;

    private UserRepository userRepository;

    public ClubServiceImpl(ClubRepository clubRepository, UserRepository userRepository) {
        this.clubRepository = clubRepository;
        this.userRepository = userRepository;
    }
    @Override
    public ClubEntity save(ClubEntity club) {
        clubRepository.findByClubNip(club.getClubNip())
                .ifPresent(club1 -> {
                    throw new InvalidClubNipException("Klub o podanym NIP już istnieje");
                });
        clubRepository.findByPhoneNumber(club.getPhoneNumber())
                .ifPresent(club1 -> {
                    throw new InvalidPhoneNumberException("Klub o podanym numerze telefonu już istnieje");
                });

        return clubRepository.save(club);
    }

    @Override
    public List<ClubEntity> findAll() {
        return StreamSupport.stream(clubRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ClubEntity> findById(Long id) {
        return clubRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return clubRepository.existsById(id);
    }

    @Override
    public ClubEntity partialUpdate(ClubEntity clubEntity) {
        return clubRepository.findById(clubEntity.getId()).map(existingClub -> {
            Optional.ofNullable(clubEntity.getClubName()).ifPresent(clubName -> {
                if(clubName.length() < 3 || clubName.length() > 50) {
                    throw new InvalidClubNameException("Nazwa klubu musi mieć od 3 do 50 znaków");
                }
                existingClub.setClubName(clubName);
            });
            Optional.ofNullable(clubEntity.getClubNip()).ifPresent(clubNip -> {
                if(clubNip.length() != 10) {
                    throw new InvalidClubNipException("NIP musi mieć 10 znaków");
                }
                existingClub.setClubNip(clubNip);
            });
            Optional.ofNullable(clubEntity.getPhoneNumber()).ifPresent(phoneNumber -> {
                if(phoneNumber.length() != 9) {
                    throw new InvalidPhoneNumberException("Numer telefonu musi mieć 9 znaków");
                }
                existingClub.setPhoneNumber(phoneNumber);
            });
            return clubRepository.save(existingClub);
        }).orElseThrow(() -> new RuntimeException("Club not found"));
    }

    @Override
    public void delete(Long id) {
        clubRepository.deleteById(id);
    }

    @Override
    public Optional<ClubEntity> findByUserId(Long userId) {
        return clubRepository.findByUserId(userId);
    }

    @Override
    public List<UserEntity> findUsersByClubId(Long clubId) {
        return clubRepository.findUsersByClubId(clubId);
    }

    @Override
    public List<UserEntity> addMember(Long clubId, Long userId) {
        ClubEntity club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (club.getUsers().contains(user)) {
            throw new RuntimeException("User already in club");
        }
        club.getUsers().add(user);
        clubRepository.save(club);
        return club.getUsers();
    }

    @Override
    public List<UserEntity> removeMember(Long id) {
        ClubEntity club = clubRepository.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        club.getUsers().remove(user);
        clubRepository.save(club);
        return club.getUsers();
    }

    @Override
    public List<ClubRankingDto> getRankingForClub(Long clubId) {

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date start = calendar.getTime();

        calendar.add(Calendar.MONTH, 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date end = calendar.getTime();

        List<Object[]> results = clubRepository.getRankingForClub(clubId, start, end);

        List<ClubRankingDto> ranking = new ArrayList<>();
        for (Object[] row : results) {
            Long memberId = (Long) row[0];
            String firstName = (String) row[1];
            String lastName = (String) row[2];
            Long attendanceCount = (Long) row[3];
            ranking.add(new ClubRankingDto(memberId, firstName, lastName, attendanceCount));
        }
        return ranking;
    }

    @Override
    public void updatePaymentSettings(Long clubId, PaymentSettingsDTO paymentSettingsDTO) {
        ClubEntity club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        club.setMembershipFee(paymentSettingsDTO.getMembershipFee());
        club.setIsPaymentEnabled(paymentSettingsDTO.isPaymentEnabled());
        clubRepository.save(club);
    }
}

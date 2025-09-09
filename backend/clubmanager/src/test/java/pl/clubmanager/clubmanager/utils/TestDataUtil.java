package pl.clubmanager.clubmanager.utils;

import pl.clubmanager.clubmanager.domain.entities.*;
import pl.clubmanager.clubmanager.enums.Role;
import pl.clubmanager.clubmanager.enums.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

public final class TestDataUtil {
    private TestDataUtil() {
    }

    // User test data
    public static UserEntity createTestUserEntityA() {
        return UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@gmail.com")
                .password("password123")
                .birthDate(LocalDate.of(1990, 1, 15))
                .phoneNumber("123456789")
                .enabled(true)
                .role(Role.COMPETITOR)
                .build();
    }

    public static UserEntity createTestUserEntityB() {
        return UserEntity.builder()
                .firstName("Jane")
                .lastName("Austen")
                .email("jane.austen@gmail.com")
                .password("password456")
                .birthDate(LocalDate.of(1985, 5, 20))
                .phoneNumber("987654321")
                .enabled(true)
                .role(Role.COACH)
                .build();
    }

    public static UserEntity createTestOwnerEntity() {
        return UserEntity.builder()
                .firstName("Club")
                .lastName("Owner")
                .email("owner@clubmanager.com")
                .password("ownerPassword")
                .birthDate(LocalDate.of(1980, 3, 10))
                .phoneNumber("555123456")
                .enabled(true)
                .role(Role.OWNER)
                .build();
    }

    public static UserEntity createTestCoachEntity() {
        return UserEntity.builder()
                .firstName("Mike")
                .lastName("Coach")
                .email("coach@clubmanager.com")
                .password("coachPassword")
                .birthDate(LocalDate.of(1975, 8, 25))
                .phoneNumber("555789012")
                .enabled(true)
                .role(Role.COACH)
                .build();
    }

    // Club test data
    public static ClubEntity createTestClubEntityA() {
        return createTestClubEntityA(createTestOwnerEntity());
    }

    public static ClubEntity createTestClubEntityA(UserEntity owner) {
        return ClubEntity.builder()
                .phoneNumber("123456789")
                .clubNip("1234567890")
                .clubName("Test Club A")
                .owner(owner)
                .membershipFee(100)
                .users(new ArrayList<>())
                .build();
    }

    public static ClubEntity createTestClubEntityB() {
        return createTestClubEntityB(createTestOwnerEntity());
    }

    public static ClubEntity createTestClubEntityB(UserEntity owner) {
        return ClubEntity.builder()
                .phoneNumber("987654321")
                .clubNip("9876543210")
                .clubName("Test Club B")
                .owner(owner)
                .membershipFee(150)
                .users(new ArrayList<>())
                .build();
    }

    // Training test data
    public static TrainingEntity createTestTrainingEntity() {
        return createTestTrainingEntity(createTestClubEntityA(), createTestCoachEntity());
    }

    public static TrainingEntity createTestTrainingEntity(ClubEntity club, UserEntity coach) {
        return TrainingEntity.builder()
                .title("Morning Training")
                .description("Basic conditioning and technique training")
                .startTime(new Date(System.currentTimeMillis() + 86400000)) // Tomorrow
                .endTime(new Date(System.currentTimeMillis() + 86400000 + 7200000)) // 2 hours later
                .club(club)
                .coach(coach)
                .attendances(new ArrayList<>())
                .build();
    }

    // Event test data
    public static EventEntity createTestEventEntity() {
        return createTestEventEntity(createTestClubEntityA(), createTestCoachEntity());
    }

    public static EventEntity createTestEventEntity(ClubEntity club, UserEntity coach) {
        return EventEntity.builder()
                .title("Club Championship")
                .description("Annual club championship tournament")
                .startTime(new Date(System.currentTimeMillis() + 604800000)) // Next week
                .endTime(new Date(System.currentTimeMillis() + 604800000 + 14400000)) // 4 hours later
                .location("Main Gym")
                .club(club)
                .coach(coach)
                .attendances(new ArrayList<>())
                .build();
    }

    // Attendance test data
    public static AttendanceEntity createTestAttendanceEntity() {
        return createTestAttendanceEntity(
            createTestUserEntityA(),
            createTestTrainingEntity(),
            null
        );
    }

    public static AttendanceEntity createTestAttendanceEntity(UserEntity user, TrainingEntity training, EventEntity event) {
        return AttendanceEntity.builder()
                .user(user)
                .training(training)
                .event(event)
                .build();
    }

    // Payment test data
    public static PaymentEntity createTestPaymentEntity() {
        return createTestPaymentEntity(createTestUserEntityA(), createTestClubEntityA());
    }

    public static PaymentEntity createTestPaymentEntity(UserEntity user, ClubEntity club) {
        return PaymentEntity.builder()
                .user(user)
                .club(club)
                .amount(100)
                .status(Status.PAID)
                .paymentDate(LocalDate.now())
                .dueDate(LocalDate.now().plusMonths(1))
                .build();
    }

    // Invitation test data
    public static InvitationEntity createTestInvitationEntity() {
        return createTestInvitationEntity(1L);
    }

    public static InvitationEntity createTestInvitationEntity(Long clubId) {
        return InvitationEntity.builder()
                .email("invited@example.com")
                .clubId(clubId)
                .token("test-invitation-token")
                .role(Role.COMPETITOR.name())
                .expiryDate(LocalDateTime.now().plusHours(12))
                .build();
    }
}

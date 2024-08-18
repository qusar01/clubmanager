package pl.clubmanager.clubmanager.utils;

import pl.clubmanager.clubmanager.domain.entities.ClubEntity;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;

public final class TestDataUtil {
    private TestDataUtil() {
    }

    public static UserEntity createTestUserEntityA() {
        return UserEntity.builder()
                    .firstName("John")
                    .lastName("Doe")
                    .email("john.doe@gmail.com")
                    .password("password")
                    .build();
    }

    public static UserEntity createTestUserEntityB() {
        return UserEntity.builder()
                .firstName("Jane")
                .lastName("Austen")
                .email("jane.austen@gmail.com")
                .password("password")
                .build();
    }

    public static ClubEntity createTestClubEntityA() {
        return ClubEntity.builder()
                .phoneNumber("123456789")
                .clubNip("1234567890")
                .clubName("Club A")
                .build();
    }

    public static ClubEntity createTestClubEntityB() {
        return ClubEntity.builder()
                .phoneNumber("987654321")
                .clubNip("9876543210")
                .clubName("Club B")
                .build();
    }
}

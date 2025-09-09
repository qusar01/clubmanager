package pl.clubmanager.clubmanager.repositories;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.enums.Role;
import pl.clubmanager.clubmanager.utils.TestDataUtil;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByEmail_ShouldReturnUserWhenExists() {
        // Given
        UserEntity user = TestDataUtil.createTestUserEntityA();
        entityManager.persistAndFlush(user);

        // When
        Optional<UserEntity> result = userRepository.findByEmail(user.getEmail());

        // Then
        assertTrue(result.isPresent());
        assertEquals(user.getEmail(), result.get().getEmail());
        assertEquals(user.getFirstName(), result.get().getFirstName());
        assertEquals(user.getLastName(), result.get().getLastName());
    }

    @Test
    void findByEmail_ShouldReturnEmptyWhenNotExists() {
        // When
        Optional<UserEntity> result = userRepository.findByEmail("nonexistent@email.com");

        // Then
        assertTrue(result.isEmpty());
    }

    @Test
    void findByVerificationCode_ShouldReturnUserWhenExists() {
        // Given
        UserEntity user = TestDataUtil.createTestUserEntityA();
        user.setVerificationCode("TEST123");
        entityManager.persistAndFlush(user);

        // When
        Optional<UserEntity> result = userRepository.findByVerificationCode("TEST123");

        // Then
        assertTrue(result.isPresent());
        assertEquals(user.getVerificationCode(), result.get().getVerificationCode());
        assertEquals(user.getEmail(), result.get().getEmail());
    }

    @Test
    void findByVerificationCode_ShouldReturnEmptyWhenNotExists() {
        // When
        Optional<UserEntity> result = userRepository.findByVerificationCode("NONEXISTENT");

        // Then
        assertTrue(result.isEmpty());
    }

    @Test
    void save_ShouldPersistUser() {
        // Given
        UserEntity user = UserEntity.builder()
                .firstName("Test")
                .lastName("User")
                .email("test@example.com")
                .password("password")
                .birthDate(LocalDate.of(1990, 1, 1))
                .phoneNumber("123456789")
                .enabled(true)
                .role(Role.COMPETITOR)
                .build();

        // When
        UserEntity savedUser = userRepository.save(user);

        // Then
        assertNotNull(savedUser.getId());
        assertEquals(user.getFirstName(), savedUser.getFirstName());
        assertEquals(user.getLastName(), savedUser.getLastName());
        assertEquals(user.getEmail(), savedUser.getEmail());
        assertEquals(user.getRole(), savedUser.getRole());

        // Verify it's actually in the database
        UserEntity foundUser = entityManager.find(UserEntity.class, savedUser.getId());
        assertNotNull(foundUser);
        assertEquals(savedUser.getEmail(), foundUser.getEmail());
    }

    @Test
    void delete_ShouldRemoveUser() {
        // Given
        UserEntity user = TestDataUtil.createTestUserEntityA();
        UserEntity savedUser = entityManager.persistAndFlush(user);

        // When
        userRepository.deleteById(savedUser.getId());
        entityManager.flush();

        // Then
        UserEntity foundUser = entityManager.find(UserEntity.class, savedUser.getId());
        assertNull(foundUser);
    }

    @Test
    void existsById_ShouldReturnTrueWhenUserExists() {
        // Given
        UserEntity user = TestDataUtil.createTestUserEntityA();
        UserEntity savedUser = entityManager.persistAndFlush(user);

        // When
        boolean exists = userRepository.existsById(savedUser.getId());

        // Then
        assertTrue(exists);
    }

    @Test
    void existsById_ShouldReturnFalseWhenUserNotExists() {
        // When
        boolean exists = userRepository.existsById(999L);

        // Then
        assertFalse(exists);
    }
}
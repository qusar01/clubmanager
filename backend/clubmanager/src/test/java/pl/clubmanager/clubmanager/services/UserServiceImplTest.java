package pl.clubmanager.clubmanager.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.services.impl.UserServiceImpl;
import pl.clubmanager.clubmanager.utils.TestDataUtil;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private UserEntity testUser;

    @BeforeEach
    void setUp() {
        testUser = TestDataUtil.createTestUserEntityA();
        testUser.setId(1L);
    }

    @Test
    void save_ShouldReturnSavedUser() {
        // Given
        when(userRepository.save(any(UserEntity.class))).thenReturn(testUser);

        // When
        UserEntity result = userService.save(testUser);

        // Then
        assertNotNull(result);
        assertEquals(testUser.getId(), result.getId());
        assertEquals(testUser.getEmail(), result.getEmail());
        assertEquals(testUser.getFirstName(), result.getFirstName());
        assertEquals(testUser.getLastName(), result.getLastName());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void findAll_ShouldReturnListOfUsers() {
        // Given
        UserEntity user2 = TestDataUtil.createTestUserEntityB();
        user2.setId(2L);
        List<UserEntity> users = Arrays.asList(testUser, user2);
        when(userRepository.findAll()).thenReturn(users);

        // When
        List<UserEntity> result = userService.findAll();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(testUser));
        assertTrue(result.contains(user2));
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void findById_ShouldReturnUserWhenExists() {
        // Given
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

        // When
        Optional<UserEntity> result = userService.findById(userId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(testUser, result.get());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void findById_ShouldReturnEmptyWhenNotExists() {
        // Given
        Long userId = 999L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When
        Optional<UserEntity> result = userService.findById(userId);

        // Then
        assertTrue(result.isEmpty());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void isExists_ShouldReturnTrueWhenUserExists() {
        // Given
        Long userId = 1L;
        when(userRepository.existsById(userId)).thenReturn(true);

        // When
        boolean result = userService.isExists(userId);

        // Then
        assertTrue(result);
        verify(userRepository, times(1)).existsById(userId);
    }

    @Test
    void isExists_ShouldReturnFalseWhenUserNotExists() {
        // Given
        Long userId = 999L;
        when(userRepository.existsById(userId)).thenReturn(false);

        // When
        boolean result = userService.isExists(userId);

        // Then
        assertFalse(result);
        verify(userRepository, times(1)).existsById(userId);
    }

    @Test
    void delete_ShouldCallRepositoryDelete() {
        // Given
        Long userId = 1L;

        // When
        userService.delete(userId);

        // Then
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void partialUpdate_ShouldUpdateUserWhenExists() {
        // Given
        Long userId = 1L;
        UserEntity updateUser = UserEntity.builder()
                .firstName("Updated")
                .lastName("Name")
                .build();
        
        UserEntity existingUser = TestDataUtil.createTestUserEntityA();
        existingUser.setId(userId);
        
        UserEntity updatedUser = TestDataUtil.createTestUserEntityA();
        updatedUser.setId(userId);
        updatedUser.setFirstName("Updated");
        updatedUser.setLastName("Name");
        
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(UserEntity.class))).thenReturn(updatedUser);

        // When
        UserEntity result = userService.partialUpdate(userId, updateUser);

        // Then
        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("Updated", result.getFirstName());
        assertEquals("Name", result.getLastName());
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void partialUpdate_ShouldThrowExceptionWhenUserNotExists() {
        // Given
        Long userId = 999L;
        UserEntity updateUser = UserEntity.builder().firstName("Updated").build();
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            userService.partialUpdate(userId, updateUser);
        });
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(UserEntity.class));
    }
}
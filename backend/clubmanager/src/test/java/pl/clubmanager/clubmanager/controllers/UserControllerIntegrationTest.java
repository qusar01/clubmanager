package pl.clubmanager.clubmanager.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;
import pl.clubmanager.clubmanager.domain.dto.RegisterUserDto;
import pl.clubmanager.clubmanager.domain.entities.UserEntity;
import pl.clubmanager.clubmanager.enums.Role;
import pl.clubmanager.clubmanager.repositories.UserRepository;
import pl.clubmanager.clubmanager.utils.TestDataUtil;

import java.time.LocalDate;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        this.objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules(); // For LocalDate serialization
    }

    @Test
    public void testThatGetUsersReturnsHttpStatus200AndEmptyList() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/users")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$").isArray()
        );
    }

    @Test
    public void testThatGetUsersReturnsHttpStatus200AndUsersList() throws Exception {
        UserEntity user = TestDataUtil.createTestUserEntityA();
        userRepository.save(user);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/users")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$").isArray()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].firstName").value(user.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].lastName").value(user.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].email").value(user.getEmail())
        );
    }

    @Test
    public void testThatGetUserReturnsHttpStatus200WhenUserExists() throws Exception {
        UserEntity user = TestDataUtil.createTestUserEntityA();
        UserEntity savedUser = userRepository.save(user);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/users/" + savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.firstName").value(user.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.lastName").value(user.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.email").value(user.getEmail())
        );
    }

    @Test
    public void testThatGetUserReturnsHttpStatus404WhenUserNotExists() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/users/999")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatPartialUpdateUserReturnsHttpStatus200WhenUserExists() throws Exception {
        UserEntity user = TestDataUtil.createTestUserEntityA();
        UserEntity savedUser = userRepository.save(user);

        UserEntity updateUser = UserEntity.builder()
                .firstName("Updated")
                .build();
        String updateUserJson = objectMapper.writeValueAsString(updateUser);

        mockMvc.perform(
                MockMvcRequestBuilders.patch("/users/" + savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateUserJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.firstName").value("Updated")
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.lastName").value(user.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.email").value(user.getEmail())
        );
    }

    @Test
    public void testThatDeleteUserReturnsHttpStatus204WhenUserExists() throws Exception {
        UserEntity user = TestDataUtil.createTestUserEntityA();
        UserEntity savedUser = userRepository.save(user);

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/users/" + savedUser.getId())
        ).andExpect(
                MockMvcResultMatchers.status().isNoContent()
        );
    }

    @Test
    public void testThatDeleteUserReturnsHttpStatus404WhenUserNotExists() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/users/999")
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }
}

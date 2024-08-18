//package pl.clubmanager.clubmanager.controllers;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import pl.clubmanager.clubmanager.domain.entities.UserEntity;
//import pl.clubmanager.clubmanager.utils.TestDataUtil;
//
//@SpringBootTest
//@ExtendWith(SpringExtension.class)
//@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
//@AutoConfigureMockMvc
//public class UserControllerIntegrationTest {
//
//    private MockMvc mockMvc;
//
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    public UserControllerIntegrationTest(MockMvc mockMvc) {
//        this.mockMvc = mockMvc;
//        this.objectMapper = new ObjectMapper();
//    }
//
//    @Test
//    public void testThatCreateUserReturns201() throws Exception {
//        UserEntity user = TestDataUtil.createTestUserEntityA();
//        String userJson = objectMapper.writeValueAsString(user);
//
//
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/users")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(userJson)
//        ).andExpect(
//                MockMvcResultMatchers.status().isCreated()
//        );
//    }
//
//    @Test
//    public void testThatCreateUserReturnsSavedUser() throws Exception {
//        UserEntity user = TestDataUtil.createTestUserEntityA();
//        String userJson = objectMapper.writeValueAsString(user);
//
//
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/users")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(userJson)
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath("$.id").isNumber()
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath("$.firstName").value(user.getFirstName())
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath("$.lastName").value(user.getLastName())
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath("$.email").value(user.getEmail())
//        );
//    }
//}

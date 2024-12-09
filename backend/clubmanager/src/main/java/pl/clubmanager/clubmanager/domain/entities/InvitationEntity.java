package pl.clubmanager.clubmanager.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "invitations")
public class InvitationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invitation_id_seq")
    private Long id;

    private String email;

    private Long clubId;

    private String token;

    private String role;

    private LocalDateTime expiryDate;

    public InvitationEntity(String email, Long clubId, String token, String role) {
        this.email = email;
        this.clubId = clubId;
        this.token = token;
        this.role = role;
        this.expiryDate = LocalDateTime.now().plusHours(12);
    }
}

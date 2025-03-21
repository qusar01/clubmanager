package pl.clubmanager.clubmanager.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "clubs")
public class ClubEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "club_id_seq")
    private Long id;

    private String phoneNumber;

    private String clubNip;

    private String clubName;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = false)
    private UserEntity owner;

    @JoinTable(name = "club_users",
            joinColumns = @JoinColumn(name = "club_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @OneToMany(cascade = CascadeType.ALL)
    private List<UserEntity> users;

    private Integer membershipFee;

    private Boolean isPaymentEnabled = false;
}

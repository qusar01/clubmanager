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

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "owner_id")
    private UserEntity owner;

    @JoinTable
    @OneToMany(cascade = CascadeType.ALL)
    private List<UserEntity> users;
}

package kr.re.dslab.threatmodeling.type.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import kr.re.dslab.threatmodeling.type.dto.MitigationDefendDefendDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Defend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String defendId;

    private String defendName;

    @ManyToOne
    @JoinColumn(name = "mitigation_id")
    private Mitigation mitigation;

    public static Defend of(MitigationDefendDefendDto defendDefendDto, Mitigation mitigation) {
        return Defend.builder()
                .defendId(defendDefendDto.getDefendId())
                .defendName(defendDefendDto.getDefendName())
                .mitigation(mitigation)
                .build();
    }

}
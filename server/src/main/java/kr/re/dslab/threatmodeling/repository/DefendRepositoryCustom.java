package kr.re.dslab.threatmodeling.repository;

import kr.re.dslab.threatmodeling.type.dto.response.DefendResponseDto;

import java.util.List;

public interface DefendRepositoryCustom {

    List<DefendResponseDto> findDefendsByMitigationId(String mitigationId);

}

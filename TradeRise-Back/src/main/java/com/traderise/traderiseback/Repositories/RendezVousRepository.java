package com.traderise.traderiseback.Repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.traderise.traderiseback.entity.RendezVous;

public interface RendezVousRepository extends JpaRepository<RendezVous,Long> {
	@Query(value = "SELECT * FROM rendezvous r WHERE r.cours_id = :coursId AND (( :selectedDate BETWEEN r.datestart AND r.dateend ) OR ( :selectedDate1 BETWEEN r.datestart AND r.dateend ))", nativeQuery = true)
	List<RendezVous> findByDateRangeAndCourse(@Param("selectedDate") String selectedDate,@Param("selectedDate1") String selectedDate1, @Param("coursId") Long coursId);

}

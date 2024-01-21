package com.traderise.traderiseback.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.traderise.traderiseback.entity.Certif;


public interface CertifRepository extends JpaRepository<Certif,Long> {
	 @Query(value="SELECT * FROM certif u WHERE u.user_id = :iduser", nativeQuery =true)
	 List<Certif> getCertifByUser(@Param("iduser") Long iduser);
	 @Query(value="SELECT * FROM certif u WHERE u.cours_id = :idcours", nativeQuery =true)
	 List<Certif> getCertifByCours(@Param("idcours") Long idcours);
	 @Query(value="SELECT * FROM certif u WHERE u.user_id = :iduser and u.cours_id = :idcours", nativeQuery =true)
	 Certif getCertifByUserAndCours(@Param("iduser") Long iduser,@Param("idcours") Long idcours);
}

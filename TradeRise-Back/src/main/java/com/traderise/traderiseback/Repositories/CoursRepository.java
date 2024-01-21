package com.traderise.traderiseback.Repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.traderise.traderiseback.entity.Cours;
import com.traderise.traderiseback.entity.User;

/**
 * Updated by alaifi
 * Date: 03/05/2023
 * Time: 21:00
 */
@Repository
public interface CoursRepository extends JpaRepository<Cours,Long> {
	@Query(value="SELECT * FROM cours u WHERE u.user_id = :iduser", nativeQuery =true)
	 List<Cours> getCoursByUser(@Param("iduser") int iduser);
}
	
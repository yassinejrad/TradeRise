package com.traderise.traderiseback.Repositories;

import com.traderise.traderiseback.entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ReclamationRepo extends JpaRepository<Reclamation, Long> {

    List<Reclamation> findReclamationsByUser_UserName(String userName);

}

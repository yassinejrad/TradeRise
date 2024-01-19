package com.traderise.traderiseback.Repositories;

import com.traderise.traderiseback.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ConsultationRepo extends JpaRepository<Consultation, Long> {

    List<Consultation> findByConsultant_UserName(String userName);

    List<Consultation> findByUser_UserName(String userName);


}

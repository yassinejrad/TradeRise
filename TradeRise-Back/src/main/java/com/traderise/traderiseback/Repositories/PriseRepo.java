package com.traderise.traderiseback.Repositories;

import com.traderise.traderiseback.entity.Prise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriseRepo extends JpaRepository<Prise, Long> {


}

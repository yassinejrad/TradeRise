package com.traderise.traderiseback.Repositories;

import com.traderise.traderiseback.entity.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksRepo extends JpaRepository<Stocks, Long> {

    List<Stocks> findStocksByUser_UserName(String userName);
}

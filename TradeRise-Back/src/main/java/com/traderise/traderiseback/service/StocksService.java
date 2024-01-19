package com.traderise.traderiseback.service;

import com.traderise.traderiseback.Repositories.UserRepository;
import com.traderise.traderiseback.Repositories.StocksRepo;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.entity.Stocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StocksService {
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private StocksRepo StocksRepo;

    public ResponseEntity<User> SaveMoney(String name , float money){
        User u = UserRepository.findByUserName(name);
        if (money!=0 && u != null) {
            u.setMoney(u.getMoney()+money);
            UserRepository.save(u);
            return ResponseEntity.ok(u);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Stocks> acheter(Stocks Stocks , String name){
        User u = UserRepository.findByUserName(name);
        if (Stocks!=null && u != null) {
            u.setMoney(u.getMoney()-(Stocks.getCoast()*Stocks.getNumber()));
            u.setPoints(u.getPoints()+10);
            UserRepository.save(u);
            Stocks.setUser(u);
            StocksRepo.save(Stocks);
            return ResponseEntity.ok(Stocks);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Transactional
    public ResponseEntity<Stocks> vendre(Long id , String name, int number , float coast){
        User u = UserRepository.findByUserName(name);
        Optional<Stocks> s=StocksRepo.findById(id);
        if (s.isPresent() && u != null) {
            if(s.get().getNumber()==number){
                u.setMoney(u.getMoney()+(number*coast));
                u.setPoints(u.getPoints()+10);
                UserRepository.save(u);
                StocksRepo.deleteById(id);
                return ResponseEntity.ok(s.get());
            }else{
                u.setMoney(u.getMoney()+(number*coast));
                u.setPoints(u.getPoints()+10);
                UserRepository.save(u);
                s.get().setNumber(s.get().getNumber()-number);
                StocksRepo.save(s.get());
                return ResponseEntity.ok(s.get());

            }

        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    public List<Stocks> ListStocks(String name){
        return StocksRepo.findStocksByUser_UserName(name);
    }

    public User getmoney(String name){
        return UserRepository.findByUserName(name);
    }
}

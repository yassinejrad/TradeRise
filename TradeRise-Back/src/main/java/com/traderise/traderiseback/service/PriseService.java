package com.traderise.traderiseback.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.traderise.traderiseback.entity.Prise;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.Repositories.PriseRepo;
import com.traderise.traderiseback.Repositories.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PriseService {

    @Autowired
    private PriseRepo PriseRepo;
    @Autowired
    private UserRepository UserRepository;
    public List<Prise> allPrises(){
        return PriseRepo.findAll();
    }

    public Prise addprise(Prise Prise){
        return PriseRepo.save(Prise);
    }

    public ResponseEntity<Prise> updateprise(Prise Prise){
        Optional<Prise> p=PriseRepo.findById(Prise.getIdprise());
        if (!p.isPresent()){return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;}
        else{
            Prise p2=p.get();
            p2.setCoust(Prise.getCoust());
            p2.setImage(Prise.getImage());
            p2.setTitre(Prise.getTitre());
             PriseRepo.save(p2);
             return ResponseEntity.ok(p2);
        }
    }

    public ResponseEntity<Prise> removeprise(Long id){
        Optional<Prise> p=PriseRepo.findById(id);
        if (!p.isPresent()){return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;}
        else{
            Prise p2=p.get();
            PriseRepo.deleteById(id);
            return ResponseEntity.ok(p2);
        }
    }
    @Transactional
    public ResponseEntity<Prise> acheterPrise(Long id, String name) {
        User u = UserRepository.findByUserName(name);
        Optional<Prise> optionalPrise = PriseRepo.findById(id);

        if (optionalPrise.isPresent() && u != null) {
            Prise prise = optionalPrise.get();
            Integer i=u.getPoints()-prise.getCoust();
            u.setPoints(i);
            UserRepository.save(u);
            Set<User> users = prise.getUsers();
            users.add(u);
            prise.setUsers(users);
            PriseRepo.save(prise);
            return  ResponseEntity.ok(prise);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Transactional
    public ResponseEntity<User> givepoints(String name,Integer point){
        User u = UserRepository.findByUserName(name);
        if (point!=0 && u != null) {
            u.setPoints(point);
            UserRepository.save(u);
            return ResponseEntity.ok(u);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

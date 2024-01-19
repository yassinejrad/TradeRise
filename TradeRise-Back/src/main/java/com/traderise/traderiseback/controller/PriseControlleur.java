package com.traderise.traderiseback.controller;


import com.traderise.traderiseback.entity.Reclamation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.entity.Prise;
import com.traderise.traderiseback.service.PriseService;

import java.util.List;

@RestController
public class PriseControlleur {

    @Autowired
    private PriseService PriseService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Prises/allPrises")
    public List<Prise> allPrises() {
        return PriseService.allPrises();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/Prises/addprise")
    public Prise addprise(@RequestBody Prise Prise){
        return PriseService.addprise(Prise);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Prises/updateprise")
    public ResponseEntity<Object> updateprise(@RequestBody Prise Prise){
        ResponseEntity<Prise> p=PriseService.updateprise(Prise);
        if (p.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(p, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Prise non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/Prises/removeprise/{id}")
    public ResponseEntity<Object> removeprise(@PathVariable("id")Long id){
        ResponseEntity<Prise> p= PriseService.removeprise(id);
        if (p.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(p, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Prise non trouvée", HttpStatus.OK);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Prises/acheterPrise/{id}/{name}")
    public ResponseEntity<Object> acheterPrise(@PathVariable("id")Long id,@PathVariable("name")String name){
        ResponseEntity<Prise> p= PriseService.acheterPrise(id,name);
        if (p.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(p,HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Prise non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Prises/givepoints/{name}/{point}")
    public  ResponseEntity<Object> givepoints(@PathVariable("name")String name,@PathVariable("point")Integer point){
        ResponseEntity<User> p= PriseService.givepoints(name,point);
        if (p.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(p, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("user non trouvée", HttpStatus.NOT_FOUND);

        }
    }
}

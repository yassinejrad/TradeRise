package com.traderise.traderiseback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.entity.Stocks;
import com.traderise.traderiseback.service.StocksService;

import java.util.List;

@RestController
public class StocksControlleur {

    @Autowired
    private StocksService StocksService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Stocks/ListStocks/{name}")
    public List<Stocks> ListStocks(@PathVariable("name")String name) {
        return StocksService.ListStocks(name);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Stocks/getmoney/{name}")
    public User getmoney(@PathVariable("name")String name) {
        return StocksService.getmoney(name);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Stocks/SaveMoney/{name}/{money}")
    public ResponseEntity<Object> SaveMoney(@PathVariable("name") String name ,@PathVariable("money") float money){
        ResponseEntity<User> u=StocksService.SaveMoney(name,money);
        if (u.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("user non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/Stocks/acheter/{name}")
    public ResponseEntity<Object> acheter(@PathVariable("name") String name ,@RequestBody Stocks Stocks ){
        ResponseEntity<Stocks> u=StocksService.acheter(Stocks,name);
        if (u.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("user non trouvée", HttpStatus.NOT_FOUND);

        }
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Stocks/vendre/{id}/{name}/{number}/{coast}")
    public ResponseEntity<Object> vendre(@PathVariable("id") Long id ,@PathVariable("name") String name,@PathVariable("number") int number ,@PathVariable("coast") float coast ){
        ResponseEntity<Stocks> u=StocksService.vendre(id,name,number,coast);
        if (u.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("user non trouvée", HttpStatus.NOT_FOUND);

        }
    }
}

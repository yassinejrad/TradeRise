package com.traderise.traderiseback.controller;

import com.traderise.traderiseback.service.Reclamtionservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.traderise.traderiseback.entity.Reclamation;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;


@RestController
public class ReclamationControlleur {

    @Autowired
    private Reclamtionservice Reclamtionservice;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Reclamation/Reclamations")
    public List<Reclamation> retrieveAllReclamations() {
        return Reclamtionservice.retrieveAllReclamations();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Reclamation/Reclamationsforuser/{name}")
    public List<Reclamation> retrieveReclamationsforuser(@PathVariable("name")String name) {
        return Reclamtionservice.retrieveReclamationsforuser(name);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping ("/Reclamation/AddReclamation")
    public Reclamation AddReclamation(@RequestBody Reclamation Reclamation) throws MessagingException, UnsupportedEncodingException {
        return Reclamtionservice.AddReclamation(Reclamation);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Reclamation/updateReclamation")
    public ResponseEntity<Object> updateReclamation(@RequestBody Reclamation r) {
        ResponseEntity<Reclamation> r2=Reclamtionservice.updateReclamation(r);
        if (r2.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(r2, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Reclamation non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Reclamation/MarkItSeen/{id}")
    public ResponseEntity<Object> MarkItSeen(@PathVariable("id") Long id) throws MessagingException, UnsupportedEncodingException {
        ResponseEntity<Reclamation> r2=Reclamtionservice.MarkItSeen(id);
        if (r2.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(r2, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Reclamation non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/Reclamation/removeReclamation/{id}")
    public ResponseEntity<Object> removeReclamation(@PathVariable("id") Long id) {
        ResponseEntity<Reclamation> r2=Reclamtionservice.removeReclamation(id);
        if (r2.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(r2, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Reclamation non trouvée", HttpStatus.NOT_FOUND);

        }
    }
}

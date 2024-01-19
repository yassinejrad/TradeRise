package com.traderise.traderiseback.controller;


import com.traderise.traderiseback.entity.Reclamation;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import com.traderise.traderiseback.entity.Consultation;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import com.traderise.traderiseback.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@RestController
public class ConsultationControlleur {

    @Autowired
    private ConsultationService ConsultationService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Consultation/listconsultant/{userName}")
    public List<Consultation> listconsultant(@PathVariable("userName")String userName){
        return ConsultationService.listconsultant(userName);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Consultation/listuser/{userName}")
    public List<Consultation> listuser(@PathVariable("userName")String userName){
        return ConsultationService.listuser(userName);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/Consultation/makereservation/{userName}")
    public ResponseEntity<Object> makereservation(@RequestBody Consultation Consultation,@PathVariable("userName")String userName) throws MessagingException, UnsupportedEncodingException {
        ResponseEntity<Consultation> c=ConsultationService.makereservation(Consultation,userName);
        if (c.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(c, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Consultation non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Consultation/updateconsultation/{id}/{date}")
    public ResponseEntity<Object> updateconsultation(@PathVariable("id") Long id,@PathVariable("date")@DateTimeFormat(pattern = "yyyy-MM-dd") Date date){
        ResponseEntity<Consultation> c=ConsultationService.updateconsultation(id,date);
        if (c.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(c, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Consultation non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/Consultation/removeconsultation/{id}")
    public ResponseEntity<Object> removeconsultation(@PathVariable("id") Long id){
        ResponseEntity<Consultation> c=ConsultationService.removeconsultation(id);
        if (c.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(c, HttpStatus.OK);
        } else if (c.getStatusCodeValue() == 404) {
            return new ResponseEntity<>("Consultation non trouvée", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>("impossible", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Consultation/reponseconsultant/{id}/{userName}/{reponse}")
    public ResponseEntity<Object> reponseconsultant(@PathVariable("id") Long id,@PathVariable("userName") String userName,@PathVariable("reponse") boolean reponse)throws MessagingException, UnsupportedEncodingException {
        ResponseEntity<Consultation> c=ConsultationService.reponseconsultant(id,userName,reponse);
        if (c.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(c, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Consultation non trouvée", HttpStatus.NOT_FOUND);

        }
    }
}

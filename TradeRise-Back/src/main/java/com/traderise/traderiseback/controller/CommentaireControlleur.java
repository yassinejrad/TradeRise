package com.traderise.traderiseback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.traderise.traderiseback.entity.Commentaire;
import java.util.List;
import com.traderise.traderiseback.service.CommenatireService;
@RestController
public class CommentaireControlleur {

    @Autowired
    private CommenatireService CommenatireService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/Commentaire/all")
    public List<Commentaire> all(){
        return CommenatireService.all();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/Commentaire/addcommentaire")
    public Commentaire addcommentaire(@RequestBody Commentaire Commentaire ){
        return CommenatireService.addcommentaire(Commentaire);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/Commentaire/addreponse/{id}")
    public ResponseEntity<Object>addreponse(@RequestBody Commentaire Commentaire,@PathVariable("id")Long id){
        ResponseEntity<Commentaire> reponse=CommenatireService.addreponse(Commentaire,id);
        if (reponse.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(reponse, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Commentaire non trouvée", HttpStatus.NOT_FOUND);

        }
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/Commentaire/updatecommentaire/{id}/{contenu}")
    public ResponseEntity<Object>updatecommentaire(@PathVariable("id")Long id,@PathVariable("contenu")String contenu){
        ResponseEntity<Commentaire> reponse=CommenatireService.updatecommentaire(id,contenu);
        if (reponse.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(reponse, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Commentaire non trouvée", HttpStatus.NOT_FOUND);

        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/Commentaire/removecommentaire/{id}")
    public ResponseEntity<Object>removecommentaire(@PathVariable("id")Long id){
        ResponseEntity<Commentaire> reponse=CommenatireService.removecommentaire(id);
        if (reponse.getStatusCodeValue() == 200) {
            return new ResponseEntity<>(reponse, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Commentaire non trouvée", HttpStatus.NOT_FOUND);

        }
    }
}

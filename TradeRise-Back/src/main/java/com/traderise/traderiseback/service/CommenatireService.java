package com.traderise.traderiseback.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.traderise.traderiseback.entity.Commentaire;
import com.traderise.traderiseback.Repositories.CommentaireRepo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommenatireService {

    @Autowired
    private CommentaireRepo CommentaireRepo;


    public List<Commentaire> all(){
        return CommentaireRepo.findByParentIsNull();
    }
    public Commentaire addcommentaire(Commentaire c){
        return CommentaireRepo.save(c);
    }
    @Transactional
    public ResponseEntity<Commentaire> addreponse(Commentaire c,Long id){
        Optional<Commentaire> optcommentaire=CommentaireRepo.findById(id);
        if(!optcommentaire.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Commentaire Commentaire=optcommentaire.get();
            c.setParent(Commentaire);
            CommentaireRepo.save(c);
            return ResponseEntity.ok(c);
        }
    }

    public ResponseEntity<Commentaire> updatecommentaire(Long id ,String contenu){
        Optional<Commentaire> optcommentaire=CommentaireRepo.findById(id);
        if(!optcommentaire.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            Commentaire Commentaire=optcommentaire.get();
            Commentaire.setContenu(contenu);
            CommentaireRepo.save(Commentaire);
            return ResponseEntity.ok(Commentaire);
        }
    }

    public ResponseEntity<Commentaire> removecommentaire(Long id){
        Optional<Commentaire> optcommentaire=CommentaireRepo.findById(id);
        if(!optcommentaire.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            CommentaireRepo.deleteById(id);
            return ResponseEntity.ok(optcommentaire.get());
        }
    }
}

package com.traderise.traderiseback.service;

import com.traderise.traderiseback.Repositories.UserRepository;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.entity.Reclamation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.traderise.traderiseback.Repositories.ReclamationRepo;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;


@Service
public class Reclamtionservice {

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private ReclamationRepo ReclamationRepo;

    @Autowired
    private JavaMailSender mailSender;


    public void sendReclamation(String userEmail,String messagee) throws MessagingException, UnsupportedEncodingException {

        String toAddress = "traderiseteam@gmail.com";
        String fromAddress = userEmail ;
        String senderName = userEmail;
        String subject = "Reclamation ! de \n"+userEmail;
        String content = messagee + "\n\n"+"\nCordialement,\nTrade Rise Team";;
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public void sendEmailfixReclamation(String userEmail) throws MessagingException, UnsupportedEncodingException {

        String toAddress =userEmail ;
        String fromAddress = "traderiseteam@gmail.com" ;
        String senderName = "Trade Rise Team";
        String subject = "Problem fixed";
        String content = "Bonjour Madame/Monsieur,\n\n"
                + "Nous avons bien reçu votre réclamation."
                + "Nous vous remercions de nous avoir informés de cette situation et nous nous excusons pour tout inconvénient que cela a pu causer "+"\n\n"
                +"et nous vous informons que le problème est conclu."
                + "Cordialement,\nTrade Rise Team";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public List<Reclamation> retrieveAllReclamations() {
        return ReclamationRepo.findAll();
    }

    public List<Reclamation> retrieveReclamationsforuser(String name) {
        return ReclamationRepo.findReclamationsByUser_UserName(name);
    }
    @Transactional
    public Reclamation AddReclamation(Reclamation Reclamation) throws MessagingException, UnsupportedEncodingException {
        Reclamation.setStatus(false);
        User u=UserRepository.findByUserName(Reclamation.getUser().getUserName());
        sendReclamation(u.getEmail(),Reclamation.getMessage());
        return ReclamationRepo.save(Reclamation);
    }

    public ResponseEntity<Reclamation> updateReclamation(Reclamation r) {
        Optional<Reclamation> op=ReclamationRepo.findById(r.getIdrec());
        if(!op.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Reclamation r2=op.get();
            r2.setMessage(r.getMessage());
            ReclamationRepo.save(r2);
            return ResponseEntity.ok(r2);
        }
    }
    @Transactional
    public ResponseEntity<Reclamation> MarkItSeen(Long id) throws MessagingException, UnsupportedEncodingException {
        Optional<Reclamation> op=ReclamationRepo.findById(id);
        if(!op.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Reclamation r2=op.get();
            r2.setStatus(true);
            ReclamationRepo.save(r2);
            User u=UserRepository.findByUserName(r2.getUser().getUserName());
            sendEmailfixReclamation(u.getEmail());
            return ResponseEntity.ok(r2);
        }
    }

    public ResponseEntity<Reclamation> removeReclamation(Long id) {
        Optional<Reclamation> r=ReclamationRepo.findById(id);
        if(!r.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            ReclamationRepo.deleteById(id);
            return ResponseEntity.ok(r.get());
        }

    }
}

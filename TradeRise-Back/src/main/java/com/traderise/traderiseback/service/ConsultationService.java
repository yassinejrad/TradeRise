package com.traderise.traderiseback.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.Repositories.UserRepository;
import com.traderise.traderiseback.entity.Consultation;
import com.traderise.traderiseback.Repositories.ConsultationRepo;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultationService {

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private ConsultationRepo ConsultationRepo;

    @Autowired
    private JavaMailSender mailSender;

    public List<Consultation> listconsultant(String userName){
        User u=UserRepository.findByUserName(userName);
        if(u==null){
            return null;
        }else{
            return ConsultationRepo.findByConsultant_UserName(userName);
        }
    }

    public List<Consultation> listuser(String userName){
        User u=UserRepository.findByUserName(userName);
        if(u==null){
            return null;
        }else{
            return ConsultationRepo.findByUser_UserName(userName);
        }
    }

    public void sendEmailConsultation(String userEmail, String consultantEmail, String name, Date date)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = consultantEmail;
        String fromAddress = userEmail;
        String senderName = name;
        String subject = "Rendez-vous Consultation";




        Instant instant = date.toInstant();
        LocalDate localDate = instant.atZone(ZoneId.systemDefault()).toLocalDate();

        // Formattage de la date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = formatter.format(localDate);

        String content = String.format("Bonjour Madame/Monsieur,\n\n"
                + "J'espère que vous allez bien. "
                + "J'aimerais avoir un rendez-vous à la date %s.\n\n"
                + "Dans l'attente de votre réponse, veuillez accepter mes salutations.\n"
                + "Cordialement,\n%s", formattedDate, name);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public void sendEmailConfirmation(String userEmail, String consultantEmail, String name)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = userEmail;
        String fromAddress = consultantEmail;
        String senderName = name;
        String subject = "Rendez-vous Consultation";
        String content = String.format("Bonjour Madame/Monsieur,\n\n"
                + "J'espère que vous allez bien. "
                + "Je vous informe que je suis disponible pour votre demande.\n\n"
                + "À très bientôt.\n"
                + "Cordialement,\n%s", name);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public void sendEmailrefuter(String userEmail, String consultantEmail, String name)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = userEmail;
        String fromAddress = consultantEmail;
        String senderName = name;
        String subject = "Rendez-vous Consultation";
        String content = String.format("Bonjour Madame/Monsieur,\n\n"
                + "J'espère que vous allez bien. "
                + "Je vous informe malheureusement que je ne serai pas disponible à la date que vous avez proposée.\n\n"
                + "Je suis vraiment désolé(e) et j'espère que vous comprendrez.\n\n"
                + "J'espère que nous pourrons convenir d'une autre date.\n\n"
                + "Cordialement,\n%s", name);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }
    @Transactional
    public ResponseEntity<Consultation> makereservation(Consultation c,String userName) throws MessagingException, UnsupportedEncodingException {
        User u=UserRepository.findByUserName(userName);
        User u2=UserRepository.findByUserName(c.getUser().getUserName());
        if(u==null || u2==null ){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            c.setConsultant(u);
            c.setStatus(false);
            c.setReponse(false);
            ConsultationRepo.save(c);
            sendEmailConsultation(u2.getEmail(),u.getEmail(),u2.getUserName(),c.getDate());
            return ResponseEntity.ok(c);
        }
    }

    @Transactional
    public ResponseEntity<Consultation> updateconsultation(Long id,Date date){
        Optional<Consultation> c=ConsultationRepo.findById(id);
        if(!c.isPresent() ){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Consultation c2=c.get();
            c2.setDate(date);
            ConsultationRepo.save(c2);
            return ResponseEntity.ok(c2);
        }
    }

    public ResponseEntity<Consultation> removeconsultation(Long id){
        Optional<Consultation> c=ConsultationRepo.findById(id);
        if(!c.isPresent() ){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else if (c.get().isStatus()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            ConsultationRepo.deleteById(id);
            return ResponseEntity.ok(c.get());
        }
    }

    @Transactional
    public ResponseEntity<Consultation> reponseconsultant(Long id,String userName,boolean reponse) throws MessagingException, UnsupportedEncodingException {
        Optional<Consultation> c=ConsultationRepo.findById(id);
        User u=UserRepository.findByUserName(userName);
        if(!c.isPresent() || u==null ){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Consultation c2=c.get();
            if (reponse){
                c2.setStatus(reponse);
                c2.setReponse(true);
                sendEmailConfirmation(c2.getUser().getEmail(),u.getEmail(),u.getUserName());
            }
            else{
                c2.setStatus(reponse);
                c2.setReponse(true);
                sendEmailrefuter(c2.getUser().getEmail(),u.getEmail(),u.getUserName());
            }
            return ResponseEntity.ok(c2);
        }
    }
}

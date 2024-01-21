package com.traderise.traderiseback.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.traderise.traderiseback.entity.Certif;
import com.traderise.traderiseback.entity.Cours;
import com.traderise.traderiseback.entity.RendezVous;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.Repositories.CoursRepository;
import com.traderise.traderiseback.Repositories.RendezVousRepository;
import com.traderise.traderiseback.Repositories.UserRepository;

@RestController
@RequestMapping("/rendezvous")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class RendezVousController {
		@Autowired
		private RendezVousRepository rendezVousRepository;

	    @Autowired
	    private UserRepository userRepository;
	    
	    @Autowired
	    private CoursRepository coursRepository;
	    
	    @GetMapping()
	    public List<RendezVous> getAllRendezVouss() {
	        return rendezVousRepository.findAll();
	    }

	    @GetMapping("/{id}")
	    public RendezVous getRendezVousById(@PathVariable(value = "id") Long id) {
	        return rendezVousRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("RendezVous not found"));
	    }
	    @PostMapping("/save/{iduser}/{idcours}")
	    public RendezVous createRendezVous(@RequestBody RendezVous rendezVous,@PathVariable(value = "iduser") int iduser,@PathVariable(value = "idcours") Long idcours) {
	        User user = userRepository.findById(iduser).get();
	        Cours cours = coursRepository.findById(idcours).get();
	        rendezVous.setUser(user);
	        rendezVous.setCours(cours);
	        rendezVous.setTitle(cours.getTitle()+" "+user.getName());
	        rendezVous.setEtat("En attente");
	        return rendezVousRepository.save(rendezVous);
	    }
	    @PutMapping("/{id}/{etat}")
	    public RendezVous updateRendezVous(@PathVariable(value = "id") Long id,@PathVariable("etat") String etat) {
	    	RendezVous rv = rendezVousRepository.findById(id).get();
	    	rv.setEtat(etat);
	        return rendezVousRepository.save(rv);
	    }
	    @DeleteMapping("/{id}")
	    public void deleteRendezVous(@PathVariable(value = "id") Long id) {
	    	rendezVousRepository.deleteById(id);
	    }

	    @GetMapping("/date/{selectedDate}/{selectedDate1}/{idcours}")
	    public Boolean getRendezVoussForDateAndCourse(
	            @PathVariable("selectedDate") String selectedDateStr,@PathVariable("selectedDate1") String selectedDateStr1,
	            @PathVariable("idcours") Long idcours) throws ParseException {
	        // Convert the String to Date
	        SimpleDateFormat inputDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
	        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	        Date selectedDate = inputDateFormat.parse(selectedDateStr);
	        String formattedDate = outputDateFormat.format(selectedDate);
	        Date selectedDate1 = inputDateFormat.parse(selectedDateStr1);
	        String formattedDate1 = outputDateFormat.format(selectedDate1);
	        System.out.println(formattedDate); // This will print 2023-12-11 19:04:00
	        System.out.println("size"+rendezVousRepository.findByDateRangeAndCourse(formattedDate,formattedDate1, idcours).size());
	        System.out.println("++++++++"+ !rendezVousRepository.findByDateRangeAndCourse(formattedDate,formattedDate1, idcours).isEmpty());
	        return !rendezVousRepository.findByDateRangeAndCourse(formattedDate,formattedDate1, idcours).isEmpty();
	    }


}

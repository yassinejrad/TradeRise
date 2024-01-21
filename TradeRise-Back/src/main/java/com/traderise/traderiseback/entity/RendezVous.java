package com.traderise.traderiseback.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "rendezvous")
public class RendezVous {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
    
    private String title;
    
    private Date datestart;
    private Date dateend;
    private String etat;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours;
								
	public RendezVous(String title, Date datestart, Date dateend, String etat, User user, Cours cours) {
		super();
		this.title = title;
		this.datestart = datestart;
		this.dateend = dateend;
		this.etat = etat;
		this.user = user;
		this.cours = cours;
	}

	public RendezVous() {
		super();
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Cours getCours() {
		return cours;
	}
	public void setCours(Cours cours) {
		this.cours = cours;
	}

	public Date getDatestart() {
		return datestart;
	}

	public void setDatestart(Date datestart) {
		this.datestart = datestart;
	}

	public Date getDateend() {
		return dateend;
	}

	public void setDateend(Date dateend) {
		this.dateend = dateend;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}
     
    
}

package com.traderise.traderiseback.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Table(name = "messages")
public class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String text;
    
    private Date date;
    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String file;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	@JsonIgnore
	public Conversation getConversation() {
		return conversation;
	}

	public void setConversation(Conversation conversation) {
		this.conversation = conversation;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Message() {
		super();
	}

	public Message(Long id, String text, Date date, Conversation conversation, User user, String file) {
		super();
		this.id = id;
		this.text = text;
		this.date = date;
		this.conversation = conversation;
		this.user = user;
		this.file = file;
	}
    
    
}

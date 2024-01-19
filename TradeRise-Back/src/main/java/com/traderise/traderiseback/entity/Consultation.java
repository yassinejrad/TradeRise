package com.traderise.traderiseback.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "consultation")
public class Consultation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idcons")
    private Long idcons;
    private Date date;
    private boolean status;
    private boolean reponse;
    @OneToOne
    private User consultant;
    @OneToOne
    private User user;
}

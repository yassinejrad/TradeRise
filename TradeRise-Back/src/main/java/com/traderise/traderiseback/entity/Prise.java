package com.traderise.traderiseback.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table( name = "prise")
public class Prise implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idprise")
    private Long idprise;
    private String image;
    private Integer coust;
    private String titre;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<User> users;
}

package com.traderise.traderiseback.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table( name = "Stocks")
public class Stocks implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idrec")
    private Long idstocks;
    private String namestock;
    private Date date;
    private int number;
    private float coast;
    @ManyToOne
    private User user;
}

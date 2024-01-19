package com.traderise.traderiseback.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table( name = "Reclamation")
public class Reclamation  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idrec")
    private Long idrec;
    private String name;
    private String message;
    private boolean status;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
}

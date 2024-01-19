package com.traderise.traderiseback.entity;

import com.fasterxml.jackson.annotation.*;
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
@Table( name = "commentaire")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idcommentaire")
public class Commentaire implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idcommentaire")
    private Long idcommentaire;
    private String contenu;
    @OneToOne
    private User user;
    @ManyToOne
    @JsonBackReference
    private Commentaire parent;
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIdentityReference(alwaysAsId = false)
    @JsonIgnoreProperties({"parent", "reponses"})
    private Set<Commentaire> reponses;
}

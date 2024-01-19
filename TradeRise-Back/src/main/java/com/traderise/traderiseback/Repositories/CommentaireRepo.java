package com.traderise.traderiseback.Repositories;

import com.traderise.traderiseback.entity.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaireRepo extends JpaRepository<Commentaire, Long> {
    boolean existsByParent_Idcommentaire(Long id);

    Commentaire findByParent_Idcommentaire(Long id);

    List<Commentaire> findByParentIsNull();
}

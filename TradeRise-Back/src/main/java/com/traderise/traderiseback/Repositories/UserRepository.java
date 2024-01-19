package com.traderise.traderiseback.Repositories;

import com.traderise.traderiseback.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByName(String name);
    User findByUserName(String userName);


}

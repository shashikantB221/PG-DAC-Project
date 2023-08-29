package com.foodEase.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodEase.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

	Users findByEmailAndPassword(String email, String password);
}

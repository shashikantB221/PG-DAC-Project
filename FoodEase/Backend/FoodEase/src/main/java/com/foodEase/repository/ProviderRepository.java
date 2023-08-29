package com.foodEase.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodEase.model.Providers;

@Repository
public interface ProviderRepository extends JpaRepository<Providers, String> {

	 Providers findByEmail(String email);

	 Providers findByEmailAndPassword(String email,String password);

}

package com.foodEase.service.interfaces;

import java.util.List;

import com.foodEase.model.Providers;

public interface ProviderService {
	
	 public void saveProvider(Providers providers);

	 public List<Providers> findAll();

	 public void deleteProvider(Providers providers);

	 public Providers findByEmail(String email);

	 Providers findByEmailAndPassword(String email,String password);
}

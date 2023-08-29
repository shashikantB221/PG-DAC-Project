package com.foodEase.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodEase.model.Products;
import com.foodEase.model.Providers;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {

	 List<Products> findByProviders(Providers providers);

	 Products findById(Long id);
}

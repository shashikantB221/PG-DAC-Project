package com.foodEase.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodEase.model.Orders;
import com.foodEase.model.Users;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

	 List<Orders> findByUsersAndStatus(Users users, String status);
	 List<Orders> findByProviderEmailAndStatus(String providerEmail,String status);

	 Orders findById(Long id);
}

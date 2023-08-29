package com.foodEase.service.interfaces;

import java.util.List;

import com.foodEase.model.Orders;
import com.foodEase.model.Users;

public interface OrderService {
	
	public void saveAllOrders(List<Orders> orders);

    public List<Orders> findByUsersAndStatus(Users users, String status);

    public List<Orders> findByProviderEmailAndStatus(String providerEmail,String status);

    public Orders findById(Long id);

    public void save(Orders orders);
}

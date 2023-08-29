package com.foodEase.service.interfaces;

import java.util.List;

import com.foodEase.model.Users;

public interface UserService {

	public void saveUser(Users users);
    public List<Users> findAll();
    Users findByEmailAndPassword(String email, String password);
}

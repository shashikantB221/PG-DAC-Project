package com.foodEase.service.interfaces;

import com.foodEase.model.Admin;

public interface AdminService {
	Admin findByEmailAndPassword(String email, String password);
}

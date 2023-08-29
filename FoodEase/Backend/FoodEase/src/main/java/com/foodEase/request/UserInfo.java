package com.foodEase.request;

import javax.persistence.Id;

import lombok.Data;

@Data
public class UserInfo {

	 	@Id
	    private String name;
	    private String email;
	    private String password;

	    private String role;

	    private String address;

	    private String description;
}
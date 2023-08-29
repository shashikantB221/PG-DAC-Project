package com.foodEase.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
public class Users {

	  private String name;
	  @Id
	  private String email;
	  private String password;
	  
	  @JsonIgnore
	  @OneToMany(mappedBy = "users",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	  private List<Orders> orders;
}
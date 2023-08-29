package com.foodEase.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
//@Data is a convenient shortcut annotation that
//bundles the features of @ToString , @EqualsAndHashCode , @Getter / @Setter 
//and @RequiredArgsConstructor together
@Entity
public class Admin {

	@Id
	private String email;
	
	private String password;	
}
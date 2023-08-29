package com.foodEase.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Orders {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
    private long id;
    private String providerEmail;
    
    private String altName;
    private String altEmail;
    private String altPhoneNumber;
    private String altAddress;
    private String altPostalCode;
    private String instruction;
    private String status;
    private String productName;
    private String productQuantity;
    private String productPrice;
    private String subscription;

    private String placeHolder1;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private Users users;
}

package com.foodEase.request;

import lombok.Data;

@Data
public class OrderProductDetail {

	 	private String name;
	    private String quantity;
	    private String price;
	    private String providerEmail;

	    private String imgName;
}

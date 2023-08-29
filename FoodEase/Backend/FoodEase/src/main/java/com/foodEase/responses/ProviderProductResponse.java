package com.foodEase.responses;

import lombok.Data;

@Data
public class ProviderProductResponse {

	  	private Integer id;
	    private String title;
	    private String price;
	    private String description;
	    private String image01;

	    private String category;
}
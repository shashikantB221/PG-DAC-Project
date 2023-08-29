package com.foodEase.responses;

import lombok.Data;

@Data
public class ProviderOrderResponse {

		private long id;
	    private String productName;

	    private String subscription;
	    private String quantity;
	    private String price;

	    private String status;
	    private String userName;
	    private String userAddress;
	    private String userPhone;

	    private String image01;
}

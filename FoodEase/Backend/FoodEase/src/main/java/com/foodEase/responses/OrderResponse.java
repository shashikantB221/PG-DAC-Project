package com.foodEase.responses;

import lombok.Data;

@Data
public class OrderResponse {
	private String productName;
    private String providerName;
    private String subscription;
    private String quantity;
    private String price;

    private String status;

    private String image01;
}

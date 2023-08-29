package com.foodEase.request;

import java.util.List;

import lombok.Data;

@Data
public class OrderInfo {

	private String userEmail;
    private String altName;
    private String altEmail;
    private String altPhoneNumber;
    private String altAddress;
    private String altPostalCode;
    private String instruction;
    private String status;

    private String subscription;
    private List<OrderProductDetail> orderProductDetail;
}

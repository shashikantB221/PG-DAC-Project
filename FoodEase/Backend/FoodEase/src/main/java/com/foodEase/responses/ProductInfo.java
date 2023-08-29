package com.foodEase.responses;

import lombok.Data;

@Data
public class ProductInfo {
    private long id;
    private String title;
    private String price;
    private String providerName;
    private String providerdesc;
    private String providerAddress;
    private String providerEmail;

    private String image01;
    private String image02;
    private String image03;
    private String category;
    private String desc;

    public ProductInfo(long id, String title, String price, String image01, String image02, String image03, String category, String desc, String providerName, String providerdesc, String providerAddress, String providerEmail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.providerName = providerName;
        this.providerdesc = providerdesc;
        this.providerAddress = providerAddress;
        this.providerEmail = providerEmail;
        this.image01 = image01;
        this.image02 = image02;
        this.image03 = image03;
        this.category = category;
        this.desc = desc;
    }
    
}
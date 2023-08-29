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
public class Products {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String placeholder1;
    private String placeholder2;
    private String placeholder3;
    private String category;
    private String description;
    private String title;
    private String price;


    @ManyToOne(fetch = FetchType.EAGER)
    private Providers providers;
}

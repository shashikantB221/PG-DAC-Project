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
public class Providers {

    @Id
    private String email;
    private String name;
    private String address;

    private String description;

    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "providers",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Products> products;
}

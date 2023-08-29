package com.foodEase.service.interfaces;

import java.util.List;

import com.foodEase.model.Products;
import com.foodEase.model.Providers;

public interface ProductService {

	public void saveProduct(Products products);

    public List<Products> findAll();

    List<Products> findByProviders(Providers providers);

    void deleteById(Integer id);
}

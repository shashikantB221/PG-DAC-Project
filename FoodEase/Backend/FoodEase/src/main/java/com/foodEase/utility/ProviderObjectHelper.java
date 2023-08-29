package com.foodEase.utility;

import java.util.ArrayList;
import java.util.List;

import com.foodEase.model.Orders;
import com.foodEase.model.Products;
import com.foodEase.model.Providers;
import com.foodEase.request.UserInfo;
import com.foodEase.responses.ProviderOrderResponse;
import com.foodEase.responses.ProviderProductResponse;

public class ProviderObjectHelper {
	
	public static Providers prepareProviderObject(UserInfo userInfo) {
        Providers providers = new Providers();
        providers.setEmail(userInfo.getEmail());
        providers.setName(userInfo.getName());
        providers.setPassword(userInfo.getPassword());

        providers.setAddress(userInfo.getAddress());
        providers.setDescription(userInfo.getDescription());

        return providers;
    }
	
	 public static List<ProviderOrderResponse> prepareProviderOrderObject(List<Orders> ordersList) {
	        List<ProviderOrderResponse> providerOrderResponseList = new ArrayList<>();
	        for(Orders orders:ordersList){
	            ProviderOrderResponse providerOrderResponse = new ProviderOrderResponse();
	            providerOrderResponse.setProductName(orders.getProductName());
	            providerOrderResponse.setSubscription(orders.getSubscription());
	            providerOrderResponse.setStatus(orders.getStatus());
	            providerOrderResponse.setQuantity(orders.getProductQuantity());
	            providerOrderResponse.setPrice(orders.getProductPrice());
	            providerOrderResponse.setUserName(orders.getUsers().getName());
	            providerOrderResponse.setUserAddress(orders.getAltAddress());
	            providerOrderResponse.setUserPhone(orders.getAltPhoneNumber());
	            providerOrderResponse.setId(orders.getId());
	            providerOrderResponse.setImage01(orders.getPlaceHolder1());

	            providerOrderResponseList.add(providerOrderResponse);
	        }
	        return providerOrderResponseList;
	    }
	 
	 public static List<ProviderProductResponse> prepareProviderProductObject(List<Products> productsList) {
	      List<ProviderProductResponse> responses = new ArrayList<>();
	        for(Products products:productsList){
	            ProviderProductResponse providerProductResponse = new ProviderProductResponse();
	            providerProductResponse.setDescription(products.getDescription());
	            providerProductResponse.setTitle(products.getTitle());
	            providerProductResponse.setId(products.getId());
	            providerProductResponse.setImage01(products.getPlaceholder1());
	            providerProductResponse.setPrice(products.getPrice());
	            providerProductResponse.setCategory(products.getCategory());

	            responses.add(providerProductResponse);
	        }
	        return responses;

	    }
}

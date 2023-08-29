package com.foodEase.utility;

import java.util.ArrayList;
import java.util.List;

import com.foodEase.model.Providers;
import com.foodEase.responses.*;

public class AdminObjectHelper {
	
	 public static List<AllProviderResponse> prepareAllProviderObject(List<Providers> providersList) {
	        List<AllProviderResponse> responses = new ArrayList<>();
	        for(Providers providers:providersList){
	            AllProviderResponse allProviderResponse = new AllProviderResponse();
	            allProviderResponse.setDescription(providers.getDescription());
	            allProviderResponse.setName(providers.getName());
	            allProviderResponse.setAddress(providers.getAddress());
	            allProviderResponse.setEmail(providers.getEmail());

	            responses.add(allProviderResponse);
	        }
	        return responses;
	    }
}

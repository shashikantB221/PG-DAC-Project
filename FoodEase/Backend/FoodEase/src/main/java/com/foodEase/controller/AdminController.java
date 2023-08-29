package com.foodEase.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.foodEase.model.Providers;
import com.foodEase.responses.AllProviderResponse;
import com.foodEase.responses.CustomError;
import com.foodEase.responses.SuccessfulMessage;
import com.foodEase.service.interfaces.ProviderService;
import com.foodEase.utility.AdminObjectHelper;

@RestController
@RequestMapping("foodease")
@CrossOrigin
public class AdminController {
	
	@Autowired
    private ProviderService providerService;
		
	@PostMapping("/admin-delete")
	public ResponseEntity<Object> Remove(@RequestBody Providers providers)
	{
		try
		{
			Providers provd = providerService.findByEmail(providers.getEmail());
			providerService.deleteProvider(provd);
			return new ResponseEntity<>(new SuccessfulMessage("Removed Entry !"), HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(new CustomError("Something went wrong contact your primary admin"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	 @GetMapping("/admin-providers")
	    public ResponseEntity<Object> getAllProviders() {
	        try {
	            List<Providers> providers = providerService.findAll();
	            List<AllProviderResponse> responses = AdminObjectHelper.prepareAllProviderObject(providers);
	            return new ResponseEntity<>(responses, HttpStatus.OK);
	        } catch (Exception exception) {
	            return new ResponseEntity<>(new CustomError("Unable to fetch the data"), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
}

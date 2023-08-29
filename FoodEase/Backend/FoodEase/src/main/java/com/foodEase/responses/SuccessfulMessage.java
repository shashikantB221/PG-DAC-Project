package com.foodEase.responses;

import lombok.Data;

@Data
public class SuccessfulMessage {

	private String message;

    public SuccessfulMessage(String message){
        this.message = message;
    }
}

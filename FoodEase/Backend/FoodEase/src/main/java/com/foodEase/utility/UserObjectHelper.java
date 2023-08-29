package com.foodEase.utility;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.foodEase.model.Orders;
import com.foodEase.model.Products;
import com.foodEase.model.Users;
import com.foodEase.request.OrderInfo;
import com.foodEase.request.OrderProductDetail;
import com.foodEase.request.UserInfo;
import com.foodEase.responses.OrderResponse;
import com.foodEase.responses.ProductInfo;
import com.foodEase.service.interfaces.ProviderService;

public class UserObjectHelper {
	
	 	@Autowired
	    static ProviderService providerService;

	    public static Users prepareUserObject(UserInfo userInfo) {
	        Users users = new Users();
	        users.setEmail(userInfo.getEmail());
	        users.setName(userInfo.getName());
	        users.setPassword(userInfo.getPassword());


	        return users;
	    }
	    public static List<ProductInfo> prepareProductInfoObject(List<Products> productsList) {
	        List<ProductInfo> productInfoList = new ArrayList<>();

	        for (Products products : productsList) {
	            ProductInfo productInfo = new ProductInfo(products.getId(), products.getTitle(), products.getPrice(), products.getPlaceholder1(), products.getPlaceholder2(), products.getPlaceholder3()
	                    , products.getCategory(), products.getDescription(), products.getProviders().getName(), products.getProviders().getDescription(), products.getProviders().getAddress(), products.getProviders().getEmail());
	       
	            productInfoList.add(productInfo);
	        }
	        return productInfoList;
	    }

	    public static List<Orders> prepareOrderObject(OrderInfo orderInfo) {
	        List<Orders> ordersList = new ArrayList<>();
	        for(OrderProductDetail orderProductDetail:orderInfo.getOrderProductDetail()){
	            Orders orders = new Orders();
	            orders.setProviderEmail(orderProductDetail.getProviderEmail());
	            orders.setPlaceHolder1(orderProductDetail.getImgName());

	            orders.setAltName(orderInfo.getAltName());
	            orders.setAltEmail(orderInfo.getAltEmail());
	            orders.setAltPhoneNumber(orderInfo.getAltPhoneNumber());
	            orders.setAltAddress(orderInfo.getAltAddress());
	            orders.setAltPostalCode(orderInfo.getAltPostalCode());
	            orders.setInstruction(orderInfo.getInstruction());
	            orders.setStatus(orderInfo.getStatus());
	            orders.setProductName(orderProductDetail.getName());
	            orders.setProductQuantity(orderProductDetail.getQuantity());
	            orders.setProductPrice(orderProductDetail.getPrice());
	            orders.setSubscription(orderInfo.getSubscription());

	            Users user = new Users();
	            user.setEmail(orderInfo.getUserEmail());
	            orders.setUsers(user);
	            ordersList.add(orders);
	        }

	        return ordersList;
	    }

	    public static List<OrderResponse> prepareOrderResponseObject(List<Orders> ordersList,ProviderService providerService) throws Exception {
	        List<OrderResponse> orderResponseList = new ArrayList<>();

	        for (Orders orders : ordersList) {
	            OrderResponse orderResponse = new OrderResponse();
	            orderResponse.setProductName(orders.getProductName());
	            orderResponse.setProviderName(getProviderName(orders.getProviderEmail(),providerService));
	            orderResponse.setPrice(orders.getProductPrice());
	            orderResponse.setSubscription(orders.getSubscription());
	            orderResponse.setStatus(orders.getStatus());
	            orderResponse.setQuantity(orders.getProductQuantity());
	            orderResponse.setImage01(orders.getPlaceHolder1());
	            orderResponseList.add(orderResponse);


	        }
	        return orderResponseList;
	    }

	    public static String getProviderName(String providerEmail, ProviderService providerService) throws Exception {
	        try {
	            try {
	                return providerService.findByEmail(providerEmail).getName();
	            } catch (Exception e) {
	                return "Provider deactivated";
	            }

	        } catch (Exception exception) {
	            throw new Exception("Unable to fetch the data");
	        }
	    }
}

package com.foodEase.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodEase.model.Orders;
import com.foodEase.model.Products;
import com.foodEase.model.Providers;
import com.foodEase.model.Users;
import com.foodEase.request.OrderInfo;
import com.foodEase.request.UserInfo;
import com.foodEase.responses.CustomError;
import com.foodEase.responses.OrderResponse;
import com.foodEase.responses.ProductInfo;
import com.foodEase.responses.SuccessfulMessage;
import com.foodEase.service.interfaces.AdminService;
import com.foodEase.service.interfaces.OrderService;
import com.foodEase.service.interfaces.ProductService;
import com.foodEase.service.interfaces.ProviderService;
import com.foodEase.service.interfaces.UserService;
import com.foodEase.utility.ProviderObjectHelper;
import com.foodEase.utility.UserObjectHelper;

@RestController
@RequestMapping("foodease")
@CrossOrigin
public class UserController {
	
		@Autowired
	    private UserService userService;

	    @Autowired
	    private ProductService productService;

	    @Autowired
	    private ProviderService providerService;

	    @Autowired
	    private OrderService orderService;

	    @Autowired
	    private AdminService adminService;

	    private final String ADMIN = "Admin";
	    private final String USER = "User";
	    private final String PROVIDER = "Provider";

	    @PostMapping("/add")
	    public ResponseEntity<Object> add(@RequestBody UserInfo userInfo) {
	        try {

	          if (userInfo.getRole().equals(PROVIDER)) {
	                Providers providers = ProviderObjectHelper.prepareProviderObject(userInfo);
	                if (providerService.findAll().stream().filter(obj -> obj.getEmail().equals(providers.getEmail())).findAny().isPresent()) {
	                    return new ResponseEntity<>(new CustomError("Email is already taken !"), HttpStatus.INTERNAL_SERVER_ERROR);
	                } else {
	                    providerService.saveProvider(providers);
	                }
	            } else {
	                Users users = UserObjectHelper.prepareUserObject(userInfo);
	                if (userService.findAll().stream().filter(obj -> obj.getEmail().equals(users.getEmail())).findAny().isPresent()) {
	                    return new ResponseEntity<>(new CustomError("Email is already taken !"), HttpStatus.INTERNAL_SERVER_ERROR);
	                } else {
	                    userService.saveUser(users);
	                }
	            }
	            return new ResponseEntity<>(new SuccessfulMessage("Added Entry !"), HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(new CustomError("Something went wrong contact your primary admin"), HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	    }


	    @GetMapping("/login")
	    public ResponseEntity<Object> login(@RequestParam String email, @RequestParam String password, @RequestParam String role) {
	        try {
	            Object obj;
	            if (role.equals(ADMIN)) {
	                obj = adminService.findByEmailAndPassword(email, password);
	            } else if (role.equals(PROVIDER)) {
	                obj = providerService.findByEmailAndPassword(email, password);
	            } else {
	                obj = userService.findByEmailAndPassword(email, password);
	            }
	            if (Objects.nonNull(obj)) {
	                return new ResponseEntity<>(obj, HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>(new CustomError("Please check your email and password kindly"), HttpStatus.UNAUTHORIZED);
	            }

	        } catch (Exception e) {
	            return new ResponseEntity<>(new CustomError("Something went wrong contact your primary admin"), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }


	    @GetMapping("/products")
	    public ResponseEntity<Object> getAllProducts() {
	        try {
	            List<Products> products = productService.findAll();
	            List<ProductInfo> productInfo = UserObjectHelper.prepareProductInfoObject(products);
	            return new ResponseEntity<>(productInfo,HttpStatus.OK);
	        } catch (Exception exception) {
	            return new ResponseEntity<>(new CustomError("Unable to fetch the data"),HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	    @PostMapping("/save-orders")
	    public ResponseEntity<Object> saveOrders(@RequestBody OrderInfo orderInfo) {
	        try {
	            List<Orders> orders = UserObjectHelper.prepareOrderObject(orderInfo);
	            orderService.saveAllOrders(orders);
	            return new ResponseEntity<>(new SuccessfulMessage("Added Entries !"), HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(new CustomError("Something went wrong contact your primary admin"), HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	    }

	    @GetMapping("/orders")
	    public ResponseEntity<Object> getAllOrders(@RequestParam String userEmail,@RequestParam String status) {
	        try {
	            Users users = new Users();
	            users.setEmail(userEmail);
	            List<Orders> orders = orderService.findByUsersAndStatus(users,status);

	            List<OrderResponse> orderResponseList = UserObjectHelper.prepareOrderResponseObject(orders,providerService);
	            return new ResponseEntity<>(orderResponseList, HttpStatus.OK);
	        } catch (Exception exception) {
	            return new ResponseEntity<>(new CustomError("Unable to fetch the data"), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
}
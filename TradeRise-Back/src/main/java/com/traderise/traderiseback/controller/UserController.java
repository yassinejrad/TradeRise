package com.traderise.traderiseback.controller;

import com.traderise.traderiseback.entity.ImageUploadResponse;
import com.traderise.traderiseback.entity.Role;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
    @PutMapping("/upload/image")
    public ResponseEntity<ImageUploadResponse> uplaodImage(@RequestParam("image") MultipartFile file,@RequestParam("userName") String userName) throws IOException {
        return userService.uploadImage(file, userName);
    }

    @GetMapping(path = {"/get/image/info/{name}"})
    public User getImageDetails(@PathVariable("name") String name, @RequestParam("userName") String userName) throws IOException {

        return userService.getImageDetails(name,userName);
    }

    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        return userService.getImage(name);
    }
    @GetMapping({"/getAllUsers"})
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    };
}

package com.traderise.traderiseback.service;

import com.traderise.traderiseback.entity.ImageUploadResponse;
import com.traderise.traderiseback.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface IUserService {
    public ResponseEntity<ImageUploadResponse> uploadImage(MultipartFile file , String userName) throws IOException;
    public User getImageDetails(String name , String userName);
    public ResponseEntity<byte[]> getImage( String userName);
    List<User> getAllUsers();
}

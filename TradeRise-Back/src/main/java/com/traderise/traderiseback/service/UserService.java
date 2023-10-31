package com.traderise.traderiseback.service;

import com.traderise.traderiseback.Repositories.UserRepository;
import com.traderise.traderiseback.dao.RoleDao;
import com.traderise.traderiseback.dao.UserDao;
import com.traderise.traderiseback.entity.ImageUploadResponse;
import com.traderise.traderiseback.entity.Role;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.util.ImageUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

//        User user = new User();
//        user.setUserName("raj123");
//        user.setUserPassword(getEncodedPassword("raj@123"));
//        user.setUserFirstName("raj");
//        user.setUserLastName("sharma");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userDao.save(user);
    }

    public User registerNewUser(User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }


    @Override
    public ResponseEntity<ImageUploadResponse> uploadImage(MultipartFile file, String userName) throws IOException {
        User user = userRepository.findById(userName).orElse(null);

        if (user != null) {
            user.setName(file.getOriginalFilename());
            user.setType(file.getContentType());
            user.setImage(ImageUtility.compressImage(file.getBytes()));
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ImageUploadResponse("Image uploaded successfully: " +
                            file.getOriginalFilename()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ImageUploadResponse("User not found: " + userName));
        }
    }


    @Override
    public User getImageDetails(String name , String userName) {
        User user = userRepository.findById(userName).get();
        return User.builder()
                .userName(userName)
                .name(user.getName())
                .type(user.getType())
                .image(ImageUtility.decompressImage(user.getImage())).build();
    }

    @Override
    public ResponseEntity<byte[]> getImage(String userName) {
        Optional<User> optionalUser = userRepository.findById(userName);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(user.getType()))
                    .body(ImageUtility.decompressImage(user.getImage()));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new byte[0]); // You can return an empty byte array or handle this differently
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}

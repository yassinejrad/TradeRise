package com.traderise.traderiseback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.traderise.traderiseback.entity.Conversation;
import com.traderise.traderiseback.entity.Cours;
import com.traderise.traderiseback.entity.Message;
import com.traderise.traderiseback.entity.RendezVous;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.Repositories.CoursRepository;
import com.traderise.traderiseback.Repositories.UserRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Updated by alaifi
 * Date: 04/05/2023
 * Time: 01:14
 */
@RestController
@RequestMapping("/cours")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class CoursController {
	@Autowired
    private ResourceLoader resourceLoader;
	@Value("${upload.folder.path}")
    private String uploadFolderPath;
    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private UserRepository userRepository;
    @GetMapping()
    public List<Cours> getAllCourss() {
        return coursRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cours getCoursById(@PathVariable(value = "id") Long id) {
        return coursRepository.findById(id).get();
    }
    @GetMapping("/byuser/{id}")
    public List<Cours> getCoursByUser(@PathVariable(value = "id") int id) {
        return coursRepository.getCoursByUser(id);
    }
    @PostMapping(value = "/save/{iduser}/{file}")
    public Cours addCourswithfile(@PathVariable(value = "iduser") int iduser,
    		@RequestBody Cours cours, @PathVariable(value = "file",required = false) String file) {
        // Find the discussion
    	
		 User usercon  = userRepository.findById(iduser).get();
		 System.out.println(usercon);
    	Calendar calendar = Calendar.getInstance();
    	cours.setUser(usercon);

        // Find the sender user
        
        // If a file is provided, add it to the message
        if (file != null) {
        	cours.setFile(file);
        } 
        
        // Save the new message to the database
        

        return coursRepository.save(cours);
    }
    @PostMapping("/save/{iduser}")
    public Cours createCours(@RequestBody Cours cours,@PathVariable(value = "iduser") int iduser, @PathVariable(value = "file",required = false) String file) {
        User user = userRepository.findById(iduser).get();
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR,1);
		Date date =  calendar.getTime();
		cours.setFile(file);
        cours.setUser(user);
        cours.setDate(date);
        return coursRepository.save(cours);
    }
    @PutMapping("/{id}")
    public Cours updateCours(@PathVariable(value = "id") Long id, Cours cours) {
    	cours.setId(id);
        return coursRepository.save(cours);
    }
    @DeleteMapping("/{id}")
    public void deleteCours(@PathVariable(value = "id") Long id) {
    	coursRepository.deleteById(id);
    }
    @PostMapping("/uploadFile")
    @ResponseBody
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Get the file and save it somewhere
        	
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadFolderPath,file.getOriginalFilename());
            Files.write(path, bytes);
            
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
    }

    @GetMapping("/file/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable(value = "filename") String filename) {
        try {
            // Load the resource using ResourceLoader
            Resource resource = resourceLoader.getResource("classpath:static/upload/" + filename);

            // Get the input stream from the resource
            InputStream inputStream = resource.getInputStream();

            // Read the contents of the file into a byte array using ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead;
System.out.println(filename);
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            byte[] fileContent = outputStream.toByteArray();

            // Set up the HTTP headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", filename);

            // Return the file content in the response body with appropriate headers
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileContent.length)
                    .body(fileContent);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<byte[]>("Failed to open file".getBytes(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
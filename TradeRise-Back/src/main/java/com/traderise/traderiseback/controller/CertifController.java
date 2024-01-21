package com.traderise.traderiseback.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.traderise.traderiseback.entity.Certif;
import com.traderise.traderiseback.entity.Cours;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.Repositories.CertifRepository;
import com.traderise.traderiseback.Repositories.CoursRepository;
import com.traderise.traderiseback.Repositories.UserRepository;

@RestController
@RequestMapping("/certif")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class CertifController {
	@Autowired
    private ResourceLoader resourceLoader;
	@Value("${upload.folder.path}")
    private String uploadFolderPath;
	@Autowired
    private CertifRepository certifRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CoursRepository coursRepository;
    @GetMapping()
    public List<Certif> getAllCertifs() {
        return certifRepository.findAll();
    }

    @GetMapping("/{id}")
    public Certif getCertifById(@PathVariable(value = "id") Long id) {
        return certifRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Certif not found"));
    }
    @GetMapping("/allbyuser/{id}")
    public List<Certif> getCertifByUser(@PathVariable(value = "id") Long id) {
        return certifRepository.getCertifByUser(id);
    }
    @GetMapping("/byusercours/{iduser}/{idcours}")
    public Certif getCertifByUserCours(@PathVariable(value = "iduser") Long iduser,@PathVariable(value = "idcours") Long idcours) {
        return certifRepository.getCertifByUserAndCours(iduser, idcours);
    }

    @GetMapping("/allbycours/{id}")
    public List<Certif> getCertifByCours(@PathVariable(value = "id") Long id) {
        return certifRepository.getCertifByCours(id);
    }
    @PostMapping("/save/{iduser}/{idcours}/{file}")
    public Certif createCertif(@PathVariable(value = "iduser") int iduser,@PathVariable(value = "idcours") Long idcours, @PathVariable(value = "file",required = false) String file ) {
    	Certif certif = new Certif();
        User user = userRepository.findById(iduser).get();
        Cours cours = coursRepository.findById(idcours).get();
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR,1);
		Date date =  calendar.getTime();
		certif.setTitle("Certificat de "+cours.getTitle());
		certif.setEtat("attente");
        certif.setUser(user);
        certif.setCours(cours);
        certif.setDate(date);
        System.out.println(certif.getFile());
        if (file != null) {
        	certif.setFile(file);
        } 
        return certifRepository.save(certif);
    }
    @PutMapping("/accord/{id}")
    public Certif accepterCertif(@PathVariable(value = "id") Long id) {
    	Certif certif = certifRepository.findById(id).get();
    	certif.setEtat("accord");
        return certifRepository.save(certif);
    }
    @PutMapping("/refus/{id}")
    public Certif refusCertif(@PathVariable(value = "id") Long id) {
    	Certif certif = certifRepository.findById(id).get();
    	certif.setEtat("refus");
    	 return certifRepository.save(certif);
    }
    @DeleteMapping("/{id}")
    public void deleteCertif(@PathVariable(value = "id") Long id) {
    	certifRepository.deleteById(id);
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

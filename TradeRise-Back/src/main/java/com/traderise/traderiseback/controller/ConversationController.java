package com.traderise.traderiseback.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.traderise.traderiseback.entity.Conversation;
import com.traderise.traderiseback.entity.Message;
import com.traderise.traderiseback.entity.User;
import com.traderise.traderiseback.Repositories.ConversationRepository;
import com.traderise.traderiseback.Repositories.MessageRepository;
import com.traderise.traderiseback.Repositories.UserRepository;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/conversation")
public class ConversationController {
	@Value("${upload.folder.path}")
    private String uploadFolderPath;
    @Autowired
    private ConversationRepository conversationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ResourceLoader resourceLoader;
    
    @PostMapping(value="/save/{idsend}/{idrec}")
	public Conversation save(@PathVariable(value = "idsend") int idsend,@PathVariable(value = "idrec") int idrec){
		 Calendar calendar = Calendar.getInstance();
		 calendar.add(Calendar.HOUR,1);
	     Date date =  calendar.getTime();
	     Conversation c = new Conversation();
	      User user1 = userRepository.findById(idsend).get();
	      User user2 = userRepository.findById(idrec).get();
	      c.setUser1(user1);
	      c.setUser2(user2);
		c.setLastupdate(date);
		return conversationRepository.save(c);
	}
    @PostMapping(value = "/addmessage/{id}/{iduser}/{file}")
    public Conversation addMessagewithfile(@PathVariable(value = "id") Long conversationId,@PathVariable(value = "iduser") int iduser,
    		@RequestBody Message message, @PathVariable(value = "file",required = false) String file) {
        // Find the discussion
    	Conversation conversation = conversationRepository.findById(conversationId).get();
    	
		 User usercon  = userRepository.findById(iduser).get();
		 System.out.println(usercon);
		 System.out.println("--------------");
		 System.out.println(message.getText());
    	Calendar calendar = Calendar.getInstance();
    	message.setUser(usercon);
    	message.setConversation(conversation);
		 calendar.add(Calendar.HOUR,1);
		 Date date =  calendar.getTime();
		 message.setDate(date);
		 conversation.setLastupdate(date);
        // Find the sender user
        
        // If a file is provided, add it to the message
        if (file != null) {
            message.setFile(file);
        } 
        
        // Save the new message to the database
        messageRepository.save(message);
        
        // Add the message to the discussion
        conversation.getMessages().add(message);
        
        // Save the updated discussion to the database
        return conversationRepository.save(conversation);
    }
    @PostMapping(value = "/addmessage/{id}/{iduser}")
    public Conversation addMessage(@PathVariable(value = "id") Long conversationId,@PathVariable(value = "iduser") int iduser,
    		@RequestBody Message message) {
        // Find the discussion
    	Conversation conversation = conversationRepository.findById(conversationId).get();
    	
		 User usercon  = userRepository.findById(iduser).get();
		 System.out.println(usercon);
		 System.out.println("--------------");
		 System.out.println(message.getText());
    	Calendar calendar = Calendar.getInstance();
    	message.setUser(usercon);
    	message.setConversation(conversation);
		 calendar.add(Calendar.HOUR,1);
		 Date date =  calendar.getTime();
		 message.setDate(date);
		 conversation.setLastupdate(date);
        // Find the sender user
        // Save the new message to the database
        messageRepository.save(message);
        
        // Add the message to the discussion
        conversation.getMessages().add(message);
        
        // Save the updated discussion to the database
        return conversationRepository.save(conversation);
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
        public ResponseEntity<?> getFile(@PathVariable(value = "filename") String filename) throws IOException, URISyntaxException {
        	try {
                Resource resource = resourceLoader.getResource("./src/main/resources/static/upload/" + filename);
                InputStream inputStream = resource.getInputStream();
                // Now you can read the contents of the file from the inputStream
                // and return it in the response body or do anything else with it.
                return ResponseEntity.ok("File opened successfully.");
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("Failed to open file", HttpStatus.INTERNAL_SERVER_ERROR);
            }}
    @RequestMapping(value="/messages/{id}",method=RequestMethod.GET)
	public List<Message> getMessageConversation(@PathVariable Long id){
		return messageRepository.getMessageByConvId(id);
	}
    @RequestMapping(value="/{idsend}/{idrec}",method=RequestMethod.GET)
	public Conversation getConversation(@PathVariable(value = "idsend") Long idsend,@PathVariable(value = "idrec")Long idrec ){
		return conversationRepository.getConverBy2User(idsend, idrec);
	}
    @RequestMapping(value="/getconveruser/{id}",method=RequestMethod.GET)
	public List<Conversation> getAllConversationsUsers(@PathVariable Long id){
		return conversationRepository.getConverByUser(id);
	}
}

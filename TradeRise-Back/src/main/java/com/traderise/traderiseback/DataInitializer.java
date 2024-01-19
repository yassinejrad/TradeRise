package com.traderise.traderiseback;

import com.traderise.traderiseback.dao.RoleDao;
import com.traderise.traderiseback.dao.UserDao;
import com.traderise.traderiseback.entity.Role;
import com.traderise.traderiseback.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;
    @Override
    public void run(String... args) throws Exception {
        if (userDao.count() == 0 && roleDao.count() == 0 ) {
            Role adminRole = new Role();
            adminRole.setRoleName("Admin");
            adminRole.setRoleDescription("Admin role");
            roleDao.save(adminRole);

            Role userRole = new Role();
            userRole.setRoleName("User");
            userRole.setRoleDescription("Default role for newly created record");
            roleDao.save(userRole);

            Role consultantRole = new Role();
            consultantRole.setRoleName("Consultant");
            consultantRole.setRoleDescription("role for Consultant expert");
            roleDao.save(consultantRole);

            User adminUser = new User();
            adminUser.setUserName("admin123");
            String encodedPassword = passwordEncoder.encode("admin@pass");
            adminUser.setEmail("traderiseteam@gmail.com");
            adminUser.setUserPassword(encodedPassword);
            adminUser.setUserFirstName("admin");
            adminUser.setUserLastName("admin");
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);
            adminUser.setRole(adminRoles);
            userDao.save(adminUser);

            User ConsultantUser1 = new User();
            ConsultantUser1.setUserName("Consultant1");
            String encodedPassword1 = passwordEncoder.encode("123");
            ConsultantUser1.setEmail("elfadanes@gmail.com");
            ConsultantUser1.setUserPassword(encodedPassword1);
            ConsultantUser1.setUserFirstName("Consultant1");
            ConsultantUser1.setUserLastName("Consultant1");
            Set<Role> Consultant1Roles = new HashSet<>();
            Consultant1Roles.add(consultantRole);
            ConsultantUser1.setRole(Consultant1Roles);
            userDao.save(ConsultantUser1);

            User ConsultantUser2 = new User();
            ConsultantUser2.setUserName("Consultant2");
            String encodedPassword2 = passwordEncoder.encode("123");
            ConsultantUser2.setEmail("anes_elfad@outlook.fr");
            ConsultantUser2.setUserPassword(encodedPassword2);
            ConsultantUser2.setUserFirstName("Consultant2");
            ConsultantUser2.setUserLastName("Consultant2");
            Set<Role> Consultant2Roles = new HashSet<>();
            Consultant2Roles.add(consultantRole);
            ConsultantUser2.setRole(Consultant1Roles);
            userDao.save(ConsultantUser2);
        }
    }
}

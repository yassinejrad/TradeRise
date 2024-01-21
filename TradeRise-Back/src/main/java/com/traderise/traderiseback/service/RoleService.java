package com.traderise.traderiseback.service;

import com.traderise.traderiseback.dao.RoleDao;
import com.traderise.traderiseback.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
    public List<Role> getAllRoles(){
        return (List<Role>) roleDao.findAll();
    }
}

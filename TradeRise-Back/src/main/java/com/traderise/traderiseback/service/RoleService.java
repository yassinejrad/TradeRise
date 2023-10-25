package com.traderise.traderiseback.service;

import com.traderise.traderiseback.dao.RoleDao;
import com.traderise.traderiseback.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}

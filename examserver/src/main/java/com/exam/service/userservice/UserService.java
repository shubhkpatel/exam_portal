package com.exam.service.userservice;

import com.exam.entity.User;
import com.exam.entity.UserRole;

import java.util.Set;

public interface UserService {

    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

}

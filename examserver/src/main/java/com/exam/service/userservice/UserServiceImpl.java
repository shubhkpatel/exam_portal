package com.exam.service.userservice;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // Creating User
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User userDao = userRepository.findByUsername(user.getUsername());

        if(userDao != null){
            throw new Exception("User Already Present");
        }else{

            for(UserRole ur : userRoles){
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);

            userDao = userRepository.save(user);
        }

        return userDao;
    }
}

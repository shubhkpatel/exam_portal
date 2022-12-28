package com.exam.service.userservice;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
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

    @Override
    public User getUser(String username) throws Exception {
        User user = this.userRepository.findByUsername(username);

        if(user == null){
            throw new Exception("Username Invalid!");
        }
        return user;
    }

    @Override
    public void deleteUser(Long userId) throws Exception {
        Optional<User> user = this.userRepository.findById(userId);

        if(user.isEmpty()){
            throw new Exception("User Does Not Exist!");
        }
        this.userRepository.deleteById(userId);
    }

    @Override
    public void updateUser(Long userId, User user) throws Exception {
        Optional<User> optionalUser = this.userRepository.findById(userId);

        if(optionalUser.isEmpty()){
            throw new Exception("User Does not Exist");
        }

        User userDao = optionalUser.get();

        userDao.setUserRoles(user.getUserRoles());
        userDao.setProfile(user.getProfile());
        userDao.setEmail(user.getEmail());
        userDao.setPassword(user.getPassword());
        userDao.setUsername(user.getUsername());
        userDao.setFirstName(user.getFirstName());
        userDao.setLastName(user.getLastName());
        userDao.setPhone(user.getPhone());

        this.userRepository.save(userDao);
    }

}

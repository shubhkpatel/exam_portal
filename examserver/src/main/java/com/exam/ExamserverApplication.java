package com.exam;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.userservice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	void createUser() throws Exception {
		User user = new User();
		user.setFirstName("Shubh");
		user.setLastName("Patel");
		user.setUsername("shubh_18");
		user.setPassword("abc");
		user.setEmail("abc@gmail.com");
		user.setProfile("default.png");

		Role role1 = new Role();
		role1.setRoleId(44L);
		role1.setRoleName("ADMIN");

		UserRole userRole = new UserRole();
		userRole.setRole(role1);
		userRole.setUser(user);

		Set<UserRole> userRoles = new HashSet<>();
		userRoles.add(userRole);

		User user1 = userService.createUser(user, userRoles);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting...");

		this.createUser();

	}
}

package com.kob.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.SQLOutput;
import java.util.logging.Logger;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		System.out.println(passwordEncoder.encode("zyc"));
		System.out.println(passwordEncoder.encode("zyc"));
		System.out.println(passwordEncoder.matches("zyc", "$2a$10$t/g4ReQX1PXS6R15qPlqTOmzK4DB1epTUKSrWzB7ezKgF3LtJUBkK"));
		System.out.println(passwordEncoder.matches("zyc", "$2a$10$rP/xwjlFw62wRmCu26IKOO67jkz99Dzok7xaIonbsE5z3Z8Wrthwa"));


	}

}

package com.kob.backend.contorller.user;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class userController {

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/user/all")
    public List<User> getUsers() {
        return userMapper.selectList(null);
    }

    @GetMapping("/user/{userId}/")
    public User getUser(@PathVariable int userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", userId);
       return userMapper.selectOne(queryWrapper);
    }

    @GetMapping("/user/add/{userId}/{username}/{password}")
    public String insertUser(@PathVariable int userId, @PathVariable String username, @PathVariable String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodeedPassword = passwordEncoder.encode(password);
        User user = new User(userId, username, encodeedPassword);
        userMapper.insert(user);
        return "add successfully";
    }

    @GetMapping("/user/delete/{userId}")
    public String deleteUser(@PathVariable int userId) {
        userMapper.deleteById(userId);
        return "delete successfully";
    }

}

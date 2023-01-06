package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String, String> map = new HashMap<>();

        if (username == null) {
            map.put("error_message", "用户名不能为空");
            return map;
        }
        username = username.trim();
        if (username.length() == 0) {
            map.put("error_message", "用户名不能为空");
            return map;
        }
        if (username.length() > 100) {
            map.put("error_message", "用户名过长");
            return map;
        }
        if (password == null || confirmedPassword == null) {
            map.put("error_message", "密码不能为空");
            return map;
        }
        if (password.length() == 0 || confirmedPassword.length() == 0) {
            map.put("error_message", "密码不能为空");
            return map;
        }
        if (password.length() > 100 || confirmedPassword.length() > 100) {
            map.put("error_message", "密码过长");
            return map;
        }
        if (!password.equals(confirmedPassword)) {
            map.put("error_message", "密码不一致");
            return map;
        }
        // 判断用户名是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        // 查user也可以，命名跟下面user不冲突就行
        List<User> users = userMapper.selectList(queryWrapper);
        if (!users.isEmpty()) {
            map.put("error_message", "用户已存在");
            return map;
        }

        // 加密密码
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://www.acwing.com/user/profile/index/";
        User user = new User(null, username, encodedPassword, photo);
        userMapper.insert(user);
        map.put("error_message", "success");
        return map;

    }
}

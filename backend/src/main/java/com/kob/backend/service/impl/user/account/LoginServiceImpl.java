package com.kob.backend.service.impl.user.account;

import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.LoginService;
import com.kob.backend.service.utils.UserDetailsImpl;
import com.kob.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {
//    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Map<String, String> getToken(String username, String password) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(username, password);  //将数据库中明文的用户名和密码封装成加密后的
        // 验证账号密码是否登陆 加有个API：.var能自动生成变量类型和变量名
        // 如果登陆失败，会自动处理
        Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        // 登陆成功，获取用户, 过程可以参考spring-security对接数据库那一块
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticate.getPrincipal();
        User user = loginUser.getUser();

        // 将userId封装成一个令牌，也就是jwt token
        String jwt = JwtUtil.createJWT(user.getId().toString());

        Map<String, String> map = new HashMap<>();
        // 这里是看习惯。把所有信息都存到error_message里
        map.put("error_message", "success");
        map.put("token", jwt);
        return map;
    }
}

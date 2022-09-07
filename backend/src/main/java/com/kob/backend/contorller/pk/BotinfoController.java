package com.kob.backend.contorller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.*;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotinfoController {
    @RequestMapping("getInfo/")
    public Map<String, String> getInfo() {
        Map<String, String> bot1 = new HashMap<>();
        bot1.put("name", "zyc");
        bot1.put("rating", "1000");
        return bot1;

    }
}
















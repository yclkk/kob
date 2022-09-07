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
    public List<Map<String, String>> getInfo() {
        List<Map<String, String>> list = new LinkedList<>();
        Map<String, String> bot1 = new HashMap<>();
        bot1.put("name", "zyc");
        bot1.put("rating", "1000");
        Map<String, String> bot2 = new HashMap<>();
        bot2.put("name", "lcl");
        bot2.put("rating", "1200");
        list.add(bot1);
        list.add(bot2);
        System.out.println(list.get(1));
        return list;

    }
}
















package com.project4.controller;

import com.project4.entity.Product;
import com.project4.service.CrawlDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping
public class CrawlDataController {
    @Autowired
    private CrawlDataService crawlDataService;

    @GetMapping("/crawl")
    public List<Product> crawl()  throws IOException {
       return crawlDataService.crawl();
    }

    @GetMapping("/tesst")
    public String test()  throws IOException {
        return crawlDataService.test();
    }
}

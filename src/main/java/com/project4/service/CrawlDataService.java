package com.project4.service;

import com.project4.entity.Product;

import java.io.IOException;
import java.util.List;

public interface CrawlDataService {
    List<Product> crawl() throws IOException;
    String test();
}

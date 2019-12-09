package com.project4.controller;

import com.project4.DTO.ParamHomeDTO;
import com.project4.DTO.ProductDTO;
import com.project4.DTO.ProductDetailDTO;
import com.project4.entity.Banner;
import com.project4.entity.Category;
import com.project4.entity.Product;
import com.project4.service.CrawlDataService;
import com.project4.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private HomeService homeService;

    @GetMapping("/get-category")
    public List<Category> getCategory(){
       return homeService.getCategory();
    }

    @GetMapping("/get-banner")
    public List<Banner> getBanner(){
        return homeService.getBanner();
    }

    @GetMapping("/get-product/disscount")
    public List<ProductDTO> getProductDisscount(@RequestBody ParamHomeDTO paramHomeDTO) {
        return homeService.getProductDisscount(paramHomeDTO);
    }

    @GetMapping("/get-product/new")
    public List<ProductDTO> getProductNew(@RequestBody ParamHomeDTO paramHomeDTO) {
        return homeService.getProductNew(paramHomeDTO);
    }

    @GetMapping("/get-product/sellMaxLot")
    public List<ProductDTO> getsellMaxLot(@RequestBody ParamHomeDTO paramHomeDTO) {
        return homeService.getProductSellMaxLot(paramHomeDTO);
    }

    @GetMapping("/get-product/productDetail/{ProductId}")
    public ProductDetailDTO getProductDetail(@PathVariable Integer ProductId) {
        return homeService.getProductDetail(ProductId);
    }

    @GetMapping("/get-product")
    public List<ProductDTO> getProduct(@RequestBody ParamHomeDTO paramHomeDTO) {
        return homeService.getProduct(paramHomeDTO);
    }


}

package com.project4.service;

import com.project4.DTO.ParamHomeDTO;
import com.project4.DTO.ProductDTO;
import com.project4.DTO.ProductDetailDTO;
import com.project4.entity.Banner;
import com.project4.entity.Category;
import com.project4.entity.Product;

import java.io.IOException;
import java.util.List;

public interface HomeService {
    List<Category> getCategory();
    List<ProductDTO> getProductDisscount(ParamHomeDTO paramHomeDTO);
    List<ProductDTO> getProductNew(ParamHomeDTO paramHomeDTO);
    List<ProductDTO> getProductSellMaxLot(ParamHomeDTO paramHomeDTO);
    List<ProductDTO> getProduct(ParamHomeDTO paramHomeDTO);
    ProductDetailDTO getProductDetail(Integer productId);
    List<Banner> getBanner();
}

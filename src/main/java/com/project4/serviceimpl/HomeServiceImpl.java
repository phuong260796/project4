package com.project4.serviceimpl;


import com.project4.DTO.ParamHomeDTO;
import com.project4.DTO.ProductDTO;
import com.project4.DTO.ProductDetailDTO;
import com.project4.entity.*;
import com.project4.repository.*;
import com.project4.service.CrawlDataService;
import com.project4.service.HomeService;
import org.apache.http.client.fluent.Executor;
import org.apache.http.client.fluent.Request;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HomeServiceImpl implements HomeService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DisscountRepository disscountRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Category> getCategory(){
       return categoryRepository.findAll();
    }

    @Override
    public List<ProductDTO> getProductDisscount(ParamHomeDTO paramHomeDTO) {
       List<Product> products = productRepository.findByCategoryId(paramHomeDTO.getCategoryId());
       List<ProductDTO> productDTOS = new ArrayList<>();
        for (int i = 0; i <products.size() ; i++) {
           List<Disscount> disscounts = disscountRepository.findByProductId(products.get(i).getId());
           if (!CollectionUtils.isEmpty(disscounts)){
               ProductDTO productDTO = new ProductDTO();
               productDTO.setProduct(products.get(i));
               productDTO.setDisscounts(disscounts);
               productDTOS.add(productDTO);
           }
        }
        return productDTOS;
    }

    @Override
    public List<ProductDTO> getProductNew(ParamHomeDTO paramHomeDTO) {
        int limit = 20;
        int offset = limit * (paramHomeDTO.getPage() - 1);
        String sql = "SELECT * from product p WHERE p.category_id = :category  ORDER BY  p.create_date DESC LIMIT :limit OFFSET :offset";
        List<Product> products = entityManager.createNativeQuery(sql, Product.class)
                .setParameter("limit", limit)
                .setParameter("offset", offset)
                .setParameter("category", paramHomeDTO.getCategoryId())
                .getResultList();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (int i = 0; i <products.size() ; i++) {
            List<Disscount> disscounts = disscountRepository.findByProductId(products.get(i).getId());
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProduct(products.get(i));
                productDTO.setDisscounts(disscounts);
                productDTOS.add(productDTO);
        }
        return productDTOS;
    }

    @Override
    public List<ProductDTO> getProductSellMaxLot(ParamHomeDTO paramHomeDTO) {
        int limit = 20;
        int offset = limit * (paramHomeDTO.getPage() - 1);
        String sql = "SELECT * from product p WHERE p.category_id = :category  ORDER BY  p.sell_count DESC LIMIT :limit OFFSET :offset";
        List<Product> products = entityManager.createNativeQuery(sql, Product.class)
                .setParameter("limit", limit)
                .setParameter("offset", offset)
                .setParameter("category", paramHomeDTO.getCategoryId())
                .getResultList();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (int i = 0; i <products.size() ; i++) {
            List<Disscount> disscounts = disscountRepository.findByProductId(products.get(i).getId());
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProduct(products.get(i));
            productDTO.setDisscounts(disscounts);
            productDTOS.add(productDTO);
        }
        return productDTOS;
    }

    @Override
    public List<ProductDTO> getProduct(ParamHomeDTO paramHomeDTO) {
        int limit = 20;
        int offset = limit * (paramHomeDTO.getPage() - 1);
        String sql = "SELECT * from product p WHERE p.category_id = :category  ORDER BY  p.create_date DESC LIMIT :limit OFFSET :offset";
        List<Product> products = entityManager.createNativeQuery(sql, Product.class)
                .setParameter("limit", limit)
                .setParameter("offset", offset)
                .setParameter("category", paramHomeDTO.getCategoryId())
                .getResultList();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (int i = 0; i <products.size() ; i++) {
            List<Disscount> disscounts = disscountRepository.findByProductId(products.get(i).getId());
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProduct(products.get(i));
            productDTO.setDisscounts(disscounts);
            productDTOS.add(productDTO);
        }
        return productDTOS;
    }

    @Override
    public ProductDetailDTO getProductDetail(Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()){
            ProductDetailDTO productDetailDTO = new ProductDetailDTO();
            Product product1 = product.get();
           List<Disscount> disscounts = disscountRepository.findByProductId(productId);
            List<ProductDetail> productDetails = productDetailRepository.findByProductId(productId);
            productDetailDTO.setProduct(product1);
            productDetailDTO.setDisscounts(disscounts);
            productDetailDTO.setProductDetails(productDetails);
            return productDetailDTO;
        }
        return null;
    }

    @Override
    public List<Banner> getBanner() {
        return bannerRepository.findAll();
    }
}

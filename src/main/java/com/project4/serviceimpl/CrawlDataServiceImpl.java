package com.project4.serviceimpl;


import com.project4.entity.Disscount;
import com.project4.entity.Product;
import com.project4.entity.ProductDetail;
import com.project4.repository.DisscountRepository;
import com.project4.repository.ProductDetailRepository;
import com.project4.repository.ProductRepository;
import com.project4.service.CrawlDataService;
import org.apache.http.client.fluent.Executor;
import org.apache.http.client.fluent.Request;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.jsoup.nodes.Document;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CrawlDataServiceImpl implements CrawlDataService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DisscountRepository disscountRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Override
    public List<Product> crawl() throws IOException {
        String url = "https://www.thegioididong.com/laptop";
        String res = Executor.newInstance()
                .execute(Request.Get(url))
                .returnContent().asString();
        Document doc = Jsoup.parse(String.valueOf(res));
        Elements elements = doc.getElementsByClass("homeproduct").last().getElementsByTag("li");
        List<Product> products = new ArrayList<>();
        for (int i = 0; i < elements.size(); i++) {
            if (i > 0) {
                Product product = new Product();
                String linkImage = elements.get(i).getElementsByTag("img").attr("src");
                product.setLinkImage(linkImage);
                String configuration = elements.get(i).getElementsByTag("span").text();
                product.setConfiguration(configuration);
                String title = elements.get(i).getElementsByTag("h3").text();
                product.setTitle(title);
                String price = elements.get(i).getElementsByClass("price").first().getElementsByTag("strong").text();
                price = price.replaceAll("\\.", "").replace("₫", "");
                product.setPrice(Double.parseDouble(price));
//                Product productSave = productRepository.save(product);
                String detailProduct = elements.get(i).getElementsByTag("a").attr("href");
                String urlDetailProduct = "https://www.thegioididong.com" + detailProduct;
                String respone = Executor.newInstance()
                        .execute(Request.Get(urlDetailProduct))
                        .returnContent().asString();
                Document document = Jsoup.parse(String.valueOf(respone));
                String stringDoc = document.toString();
                if (stringDoc.contains("infopr")) {
                    Element elements1 = document.getElementsByClass("infopr").last();
                    if (elements1 != null) {
                        String titleDetail = document.getElementsByClass("boxArticle").first().getElementsByTag("h2").text();
                        product.setTitleDetail(titleDetail);
                        Product product1  = productRepository.save(product);
                        Elements elements2 = elements1.getElementsByTag("span");
                        for (int j = 0; j < elements2.size(); j++) {
                            Disscount disscou = new Disscount();
                            String disscount = elements2.get(j).text();
                            disscou.setContent(disscount);
                            disscou.setProductId(product1.getId());
                            disscountRepository.save(disscou);
                        }

                        List<String> titleDetaill = new ArrayList<>();
                        Elements titleProduc = document.getElementsByClass("boxArticle").first().getElementsByTag("h3");
                        for (int j = 0; j < titleProduc.size(); j++) {
                            String titleDt = titleProduc.get(j).text();
                            if (!"".equals(titleDt)){
                                titleDetaill.add(titleDt);
                            }
                        }

                        Elements contentProductEl = document.getElementsByClass("boxArticle").first().getElementsByTag("p");
                        List<String> contentDetail = new ArrayList<>();
                        List<String> imageLink = new ArrayList<>();
                        for (int j = 0; j < contentProductEl.size(); j++) {
                            String contentProduct = contentProductEl.get(j).text();
                            if ("".equals(contentProduct)||contentProduct.contains("Bài viết này có hữu ích cho Bạn không ?")||
                            contentProduct.contains("Đọc thêm")||
                            contentProduct.contains("Cảm ơn bạn đã đánh giá bài viết này")) {
                            }else {
                                contentDetail.add(contentProduct);
                            }
                            Elements elements3 = contentProductEl.get(j).getElementsByTag("a");
                            if (!StringUtils.isEmpty(elements3.toString())) {
                                if (!StringUtils.isEmpty(elements3.first().attr("href"))) {
                                    String image = elements3.first().attr("href");
                                    if (!image.contains("javascript")) {
                                        imageLink.add(image);
                                    }
                                }
                            }
                        }

                        int size = titleDetaill.size();
                        if (size<contentDetail.size()){
                            size=contentDetail.size();
                        }
                        if (size<imageLink.size()){
                            size=imageLink.size();
                        }
                        for (int j = 0; j <size ; j++) {
                            ProductDetail productDetail =new ProductDetail();
//                            if (!StringUtils.isEmpty(titleDetaill.get(j)))
                            if (titleDetaill.size()>=size)
                            productDetail.setTitleDetail(titleDetaill.get(j));
//                            if (!StringUtils.isEmpty(contentDetail.get(j))){
                                if (contentDetail.size()>=size){
                                productDetail.setContentDetail(contentDetail.get(j));
                            }
//                            if (!StringUtils.isEmpty(imageLink.get(j))){
                                if (imageLink.size()>=size){
                                productDetail.setLinkImageDetail(imageLink.get(j));
                            }
                            productDetail.setProductId(product1.getId());
                            productDetailRepository.save(productDetail);
                        }

//                        List<ProductDetail> productDetails = new ArrayList<>();
                        /*for (int j = 0; j <titleProduc.size() ; j++) {
                            for (int k = 0; k <titleProductdfasddsafasd.size() ; k++) {
                                ProductDetail productDetail = new ProductDetail();
                                String titleProductDetail = titleProduc.get(j).text();
                                productDetail.setTitleDetail(titleProductDetail);
                                String contentProductDetail = titleProductdfasddsafasd.get(j).text();
                                productDetail.setContent(contentProductDetail);
                                 Elements elements3 = titleProductdfasddsafasd.get(j).getElementsByTag("a");
//                                String linkImageDetail =elements3.first().attr("href");
                                if (!StringUtils.isEmpty(elements3.toString())){
                                    if (!StringUtils.isEmpty(elements3.first().attr("href"))){
                                        productDetail.setLinkImage(elements3.first().attr("href"));
                                    }
                                }
                                productDetails.add(productDetail);
                            }
                        }*/
//                        product.setProductDetails(productDetails);
                    }
                }
            }
        }
       return null;
    }

    @Override
    public String test() {
        return "hello";
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project4.entity;

import lombok.Data;

import javax.persistence.*;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "product_detail")
@Data
public class ProductDetail {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "title_detail",length = 3000)
    private String TitleDetail;

    @Column(name = "content_detail",length = 3000)
    private String ContentDetail;

    @Column(name = "Link_image_detail",length = 3000)
    private String LinkImageDetail;



}

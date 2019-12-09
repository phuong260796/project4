/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project4.entity;

import javax.persistence.*;

import lombok.Data;

import java.util.List;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "title_detail",length = 3000)
    private String titleDetail;

    @Column(name = "name",length = 3000)
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "sell_count")
    private Integer sellCount;

    @Column(name = "link_image",length = 3000)
    private String linkImage;

    @Column(name = "title",length = 3000)
    private String title;

    @Column(name = "configuration",length = 3000)
    private String configuration;

    @Column(name = "create_date",length = 3000)
    private String createDate;

    @Column(name = "modify_date",length = 3000)
    private String modifyDate;

    @Column(name = "amount")
    private Integer amount;

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project4.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "disscount")
@Data
public class Disscount {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "content",length = 3000)
    private String content;

    @Column(name = "sellPrice")
    private Double sellPrice;

}


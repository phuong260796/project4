/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project4.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * @author admin
 */
@Entity
@Table(name = "Banner")
@Data
public class Banner {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "link_image")
    private String linkImage;
}

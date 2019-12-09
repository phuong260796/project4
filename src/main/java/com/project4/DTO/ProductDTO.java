/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project4.DTO;

import com.project4.entity.Disscount;
import com.project4.entity.Product;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
public class ProductDTO {
    private Product product;
    private List<Disscount> disscounts;

}

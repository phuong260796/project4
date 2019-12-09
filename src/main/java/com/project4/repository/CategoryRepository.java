/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project4.repository;

import com.project4.entity.Category;
import com.project4.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author admin
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

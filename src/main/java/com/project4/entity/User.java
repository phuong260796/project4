package com.project4.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_name",length = 3000)
    private String userName;

    @Column(name = "password",length = 3000)
    private String password;

    @Column(name = "number_phone",length = 3000)
    private String numberPhone;

    @Column(name = "address",length = 3000)
    private String address;

    @Column(name = "role_id")
    private Integer roleId;
}

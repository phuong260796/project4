package com.project4.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_temp")
public class OrderTemp {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "price")
    private Integer price;

    @Column(name = "address",length = 3000)
    private String address;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "note",length = 3000)
    private String note;



}

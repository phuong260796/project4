package com.project4.Commom;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Commom {
    public static final String localUrl = "http://localhost:8181";
    public static final String index= "index";
    public static final String updateNews= "update news";
    public static final String updateCategory= "update category";
    public static final String addnews= "add news";
    public static final String news= " news";
    public static final Integer ROLE_EMPLOYEES= 1;
    public static String getComputerName() {
        String hostname = "Unknown";
        try {
            InetAddress addr;
            addr = InetAddress.getLocalHost();
            hostname = addr.getHostName();
        } catch (UnknownHostException ex) {
            System.out.println("Hostname can not be resolved");
        }
        return hostname;
    }

    public static String getUserWindow() {
        String userName = System.getProperty("user.name");
        return userName;
    }
}

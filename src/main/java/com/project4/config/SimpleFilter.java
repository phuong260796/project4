//package com.project4.config;
//
//import com.project4.entity.User;
//import com.project4.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.FilterConfig;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//@Component
//public class SimpleFilter implements Filter {
//
//    @Autowired
//    private  UserRepository userRepository;
//
//    @Override
//    public void destroy() {
//    }
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterchain)
//            throws IOException, ServletException {
//
//        filterchain.doFilter(request, response);
//    }
//
//    @Override
//    public void init(FilterConfig filterconfig) {
//
//    }
//
//
//
//
//
//}
//

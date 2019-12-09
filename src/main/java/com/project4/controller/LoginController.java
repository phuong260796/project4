package com.project4.controller;

import com.project4.Commom.EncryptMd5;
import com.project4.DTO.ParamHomeDTO;
import com.project4.DTO.ProductDTO;
import com.project4.DTO.ProductDetailDTO;
import com.project4.DTO.UserTempDTO;
import com.project4.entity.Banner;
import com.project4.entity.Category;
import com.project4.entity.User;
import com.project4.service.HomeService;
import com.project4.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @GetMapping("/login")
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response)throws IOException {
        ModelAndView modelAndView = new ModelAndView();
        User users =  loginService.remember(request);
        if (users==null){
            modelAndView.setViewName("loginn");
        }else {
            modelAndView.setViewName("Remeber");
        }
        return modelAndView;
    }

    @GetMapping("/delete-cookie")
    public ResponseEntity deleteCookie(HttpServletResponse response, HttpServletRequest request) {
        loginService.deleteCookies(response, request);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/register")
    public ModelAndView register() {
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.setViewName("registerr");
        return modelAndView;
    }

    @PostMapping("/check-login")
    private Boolean checkLogin(@RequestBody User user, HttpServletResponse response) {
        if (loginService.check(user)){
            if (user.getUserName().contains(".")) {
                String userNameRp = user.getUserName().replace(".", "c1702l");
                Cookie cookie = new Cookie(userNameRp.replace("@", "aptech"), user.getPassword());
                response.addCookie(cookie);
                return true;
            }
            Cookie cookie = new Cookie(user.getUserName(), user.getPassword());
            response.addCookie(cookie);
            return true;
        }
        if (loginService.checkLogin(user)) {
            EncryptMd5 encryptMd5 = new EncryptMd5();
            if (user.getUserName().contains(".")) {
                String userNameRp = user.getUserName().replace(".", "c1702l");
                String EncryptMd5 = encryptMd5.encryMd5(user.getPassword());
                Cookie cookie = new Cookie(userNameRp.replace("@", "aptech"), EncryptMd5);
                response.addCookie(cookie);
                return true;
            }
            String EncryptMd5 = encryptMd5.encryMd5(user.getPassword());
            Cookie cookie = new Cookie(user.getUserName(), EncryptMd5);
            response.addCookie(cookie);
            return true;
        }
        return false;
    }

    @PostMapping("/register-check")
    private ResponseEntity registercheck(@RequestBody User user) {
        UserTempDTO userTempDTO =loginService.register(user);
        if (userTempDTO==null) {
            return  new ResponseEntity(userTempDTO,HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity(userTempDTO,HttpStatus.OK);
    }

    @PostMapping("/register-social")
    private Boolean registercheckSocial(@RequestBody User user) {
        if (loginService.registerSocial(user)) {
            return  true;
        }
        return false;
    }

    @PostMapping("/register-email")
    private ResponseEntity register(@RequestBody UserTempDTO usertemp) {
        User user = loginService.registerEmail(usertemp);
        if (user==null){
            return new ResponseEntity(user,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(user,HttpStatus.OK);
    }

    @GetMapping("/remember")
    private ResponseEntity remember(HttpServletRequest request) {
        User users =  loginService.remember(request);
        if (users==null){
            return new ResponseEntity(users,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(users,HttpStatus.OK);
    }

    @GetMapping("/login-google/{token}")
    private User loginGoogle(@PathVariable String token) {
        return loginService.loginGoogle(token);
    }
}

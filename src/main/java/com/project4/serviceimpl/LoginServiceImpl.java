package com.project4.serviceimpl;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.project4.Commom.EncryptMd5;
import com.project4.DTO.*;
import com.project4.entity.*;
import com.project4.repository.*;
import com.project4.service.HomeService;
import com.project4.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    public JavaMailSender emailSender;

    @Override
    public Boolean checkLogin(User user) {
        if (userRepository.findByUserNameAndPassword(user.getUserName(), user.getPassword()) != null) {
            return true;
        } else {
            String EncryptMd5 = com.project4.Commom.EncryptMd5.encryMd5(user.getPassword());
            if (userRepository.findByUserNameAndPassword(user.getUserName(), EncryptMd5) != null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean check(User user) {
        return userRepository.findByUserNameAndPassword(user.getUserName(), user.getPassword()) != null;
    }

    @Override
    public UserTempDTO register(User user) {
        String EncryptMd5 = com.project4.Commom.EncryptMd5.encryMd5(user.getPassword());
        user.setPassword(EncryptMd5);
        if (userRepository.findByUserName(user.getUserName()) != null) {
            return null;
        }
        Integer randomNumber = new Random().nextInt(9000) + 1000;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getUserName());
        message.setSubject("Mã xác nhận");
        String code = com.project4.Commom.EncryptMd5.encryMd5(randomNumber.toString());
        message.setText(randomNumber.toString());
        this.emailSender.send(message);
        UserTempDTO userTempDTO = new UserTempDTO();
        userTempDTO.setUserName(user.getUserName());
        userTempDTO.setPassword(user.getPassword());
        userTempDTO.setCode(code);
        return userTempDTO;
    }

    @Override
    public Boolean registerSocial(User user) {
        if (userRepository.findByUserName(user.getUserName())!=null){
            return false;
        }
        String EncryptMd5 = com.project4.Commom.EncryptMd5.encryMd5(user.getPassword());
        user.setPassword(EncryptMd5);
        userRepository.save(user);
        return true;
    }

    @Override
    public void deleteCookies(HttpServletResponse response, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0);
                cookie.setValue(null);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
    }

    @Override
    public User loginGoogle(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList("220066710916-bgn8jquci5g4cbobbo2cg7vq231eqqfl.apps.googleusercontent.com"))
                .build();
        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        User user = new User();
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            user.setUserName(email);
            User userRespone = userRepository.findByUserName(email);
            if (userRespone != null) {
                user.setPassword(userRespone.getPassword());
            }
        } else {
            return null;
        }
        return user;
    }

    @Override
    public User registerEmail(UserTempDTO userTempDTO) {
        String code = EncryptMd5.encryMd5(userTempDTO.getCodeInput());
        if (userTempDTO.getCode().equals(code)){
            User user = new User();
            user.setUserName(userTempDTO.getUserName());
            user.setPassword(userTempDTO.getPassword());
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public User remember(HttpServletRequest request) {
        List<User> userList = new ArrayList<>();
        Cookie[] cookies = request.getCookies();
        if (cookies!=null){
            for (Cookie cookie : cookies) {
                String userName1 = cookie.getName().replace("c1702l", ".");
                String userName2 =  userName1.replace("aptech", "@");
                User  user = userRepository.findByUserNameAndPassword(userName2, cookie.getValue());
                if (user!=null){
                    return user;
                }
            }
        }
        return null;
    }

}

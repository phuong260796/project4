package com.project4.service;

import com.project4.DTO.*;
import com.project4.entity.Banner;
import com.project4.entity.Category;
import com.project4.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface LoginService {
    Boolean checkLogin(User user);

    Boolean check(User user);

    UserTempDTO register(User user);

    Boolean registerSocial(User user);

    void deleteCookies(HttpServletResponse response, HttpServletRequest request);

    User loginGoogle(String token);

    User registerEmail(UserTempDTO userTempDTO);

    User remember(HttpServletRequest request);
}

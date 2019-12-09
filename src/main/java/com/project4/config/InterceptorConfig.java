package com.project4.config;

import com.project4.entity.User;
import com.project4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class InterceptorConfig extends HandlerInterceptorAdapter {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        System.out.println(request.getRequestURI());
        String url = request.getRequestURI();
        if (url.contains("/login") || url.contains("/htmlviews/") || url.contains("/check-login")||url.contains("/js/login.js")
        ||url.contains("/css")||url.contains("/ControllerJs")||url.contains("/js/")||url.contains("/ControllerJs/RegisterFacebookController.js")||url.contains("/register-social")
         ||url.contains("/register")||url.contains("/data-index")||url.contains("/register-check")
         ||url.contains("/ControllerJs/register.js")||url.contains("/login-facebook/")
         ||url.contains("/css/login1.css")||url.contains("/css/login5.css")||url.contains("/css/register.css")
         ||url.contains("/css/login3.css")||url.contains("/css/login4.css")||url.contains("/htmlviews/RegisterWithFacebook.html")

        ){
            return true;
        }else {
            Cookie[] cookies = request.getCookies();
            if (cookies!=null){
                for (Cookie cookie : cookies) {
                    String ck = cookie.getName();
                    String userNameCk = ck.replace("c1702l", ".");
                   String  userName = userNameCk.replace("aptech", "@");
                    User user = userRepository.findByUserName(userName);
                    if (user != null) {
                        if (cookie.getValue().equals(user.getPassword())) {
                            return true;
                        }
                    }
                }
            }
            response.sendRedirect("http://localhost:8181/login");
            return false;
        }
//        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, //
                           Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, //
                                Object handler, Exception ex) throws Exception {

    }

}

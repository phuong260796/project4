package com.project4.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.logging.Filter;

@Configuration
//@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/htmlviews/**").addResourceLocations("/htmlviews/");
    }

    @Bean
    public InternalResourceViewResolver jspViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/htmlviews/");
        resolver.setSuffix(".html");
        return resolver;
    }

/*
    @Bean
    public InterceptorConfig Interceptor() {
        return new InterceptorConfig();
    }

    public @Override void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(Interceptor());
        super.addInterceptors(registry);
    }*/



}

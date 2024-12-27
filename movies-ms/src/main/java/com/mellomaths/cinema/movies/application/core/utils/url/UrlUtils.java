package com.mellomaths.cinema.movies.application.core.utils.url;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class UrlUtils {

    public static String encode(String str) {
        return URLEncoder.encode(str, StandardCharsets.UTF_8);
    }
}

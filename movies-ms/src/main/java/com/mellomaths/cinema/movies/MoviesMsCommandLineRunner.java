package com.mellomaths.cinema.movies;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MoviesMsCommandLineRunner implements CommandLineRunner {

        @Override
        public void run(String... args) throws Exception {
            System.out.println("MoviesMsCommandLineRunner :: run");
        }
}

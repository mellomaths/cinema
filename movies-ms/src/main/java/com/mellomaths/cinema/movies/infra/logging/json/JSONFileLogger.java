package com.mellomaths.cinema.movies.infra.logging.json;

import java.io.FileWriter;
import java.io.IOException;

public class JSONFileLogger {

    private final String filename;

    public JSONFileLogger(String filename) {
        this.filename = filename;
    }

    public void log(WritableJson obj) {
        try (FileWriter file = new FileWriter(filename, true)) {
            file.write(obj.toJson());
        } catch (IOException ignored) {
        }
    }
}

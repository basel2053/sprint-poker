package config

import (
	"log"
	"os"
)

type AppConfig struct {
	DBUrl    string
	HTTPPort string
}

func InitAppConfig() *AppConfig {
	dbUrl := os.Getenv("DB_URL")
	if dbUrl == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	return &AppConfig{
		DBUrl:    dbUrl,
		HTTPPort: port,
	}
}

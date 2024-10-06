package main

import (
	"log"
	"log/slog"
	"os"
	"strconv"

	"github.com/basel2053/sprint-poker/config"
	"github.com/basel2053/sprint-poker/routers"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading env variables")
	}
	log.Println("env variables loaded")
	logLevel, _ := strconv.Atoi(os.Getenv("LOG_LEVEL"))
	logHandler := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{AddSource: false, Level: slog.Level(logLevel)})
	logger := slog.New(logHandler)
	slog.SetDefault(logger)
}

func main() {
	appConfig := config.InitAppConfig()
	config.ConnectDB(appConfig.DBUrl)
	defer config.CloseDB()
	r := routers.InitRouter()
	log.Fatal(r.Run(appConfig.HTTPPort))
}

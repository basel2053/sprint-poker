package config

import (
	"context"
	"log"
	"sync"

	database "github.com/basel2053/sprint-poker/db"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	Queries *database.Queries
	conn    *pgxpool.Pool
	dbOnce  sync.Once
)

func ConnectDB(dbUrl string) {
	dbOnce.Do(func() {
		conn, err := pgxpool.New(context.Background(), dbUrl)
		if err != nil {
			log.Fatal("Cannot connect to DB", err)
		}

		if err := conn.Ping(context.Background()); err != nil {
			log.Fatal(err)
		}
		Queries = database.New(conn)
	})
}

func CloseDB() {
	if conn != nil {
		conn.Close()
	}
}

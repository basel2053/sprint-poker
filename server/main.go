package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// func CORSMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
//
// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204)
// 			return
// 		}
//
// 		c.Next()
// 	}
// }

var (
	clients      = make(map[*websocket.Conn]bool)
	clientsMutex sync.Mutex
)

func writeMessage(message []byte) {
	clientsMutex.Lock()
	defer clientsMutex.Unlock()
	for client := range clients {
		err := client.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Printf("Error writing to client: %v", err)
			client.Close()
			delete(clients, client) // Remove the client on error
		}
	}
}

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/ws", func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			return
		}
		clientsMutex.Lock()
		clients[conn] = true
		clientsMutex.Unlock()

		defer func() {
			conn.Close()
			clientsMutex.Lock()
			delete(clients, conn)
			clientsMutex.Unlock()
		}()
		for {
			mt, message, err := conn.ReadMessage()
			if err != nil || mt == websocket.CloseMessage {
				break
			}
			writeMessage(message)
			log.Printf("Message %s", message)
		}
	})

	// r.Use(CORSMiddleware())
	return r
}

func main() {
	r := setupRouter()
	r.Run(":5000")
}

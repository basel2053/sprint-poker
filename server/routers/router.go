package routers

import (
	"net/http"

	"github.com/basel2053/sprint-poker/middlewares"
	v1 "github.com/basel2053/sprint-poker/routers/v1"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.Default()

	r.Use(middlewares.CORSMiddleware())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	apiv1 := r.Group("/v1")
	apiv1.Use(middlewares.AuthMiddleware())
	{

		apiv1.POST("/rooms", v1.CreateRoom)

		apiv1.GET("/ws", v1.Sockets)

	}

	return r
}

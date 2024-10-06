package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type room struct {
	Name        string `json:"name" binding:"required"`
	DisplayName string `json:"displayName"`
}

func CreateRoom(c *gin.Context) {
	room := &room{}
	if err := c.BindJSON(room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "room created",
	})
}

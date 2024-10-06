package v1

import (
	"fmt"
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
	userId, exists := c.Get("userId")
	if !exists {
		if room.DisplayName == "" {
			c.JSON(http.StatusForbidden, gin.H{"message": "You must have an account to create a room."})
			return
		}
		// create temporary account
		// userId = the newly created account id
	}
	fmt.Println(userId)
	c.JSON(http.StatusCreated, gin.H{
		"message": "room created",
	})
}

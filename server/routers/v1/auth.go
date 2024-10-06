package v1

import "github.com/gin-gonic/gin"

type credentials struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

func signup(c *gin.Context) {}

func login(c *gin.Context) {}

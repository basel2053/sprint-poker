package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AnonymousLoginMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			user := &User{}
			if err := c.BindJSON(user); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
				return
			}
			// Start creating cookie and token for a guest user
		}
		c.Next()
	}
}

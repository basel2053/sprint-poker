package middlewares

import (
	"log/slog"
	"net/http"
	"strings"

	"github.com/basel2053/sprint-poker/helpers"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authMidLogger := slog.With("middleware", "auth")
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			authMidLogger.Warn("no auth header found")
			c.JSON(http.StatusUnauthorized, gin.H{"message": "No token provided"})
			c.Abort()
			return
		}
		vals := strings.Split(authHeader, " ")
		if len(vals) != 2 || vals[0] != "Bearer" || vals[1] == "" {
			authMidLogger.Warn("auth header malformed")
			c.JSON(http.StatusUnauthorized, gin.H{"message": "malformed auth header"})
			c.Abort()
			return
		}
		tokenString := vals[1]
		claims, err := helpers.VerifyJWT(tokenString, "secret")
		if err != nil {
			authMidLogger.Warn("invalid access token")
			c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid token"})
			c.Abort()
			return
		}
		c.Set("userId", claims["userId"])
		c.Next()
	}
}

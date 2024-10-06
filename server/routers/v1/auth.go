package v1

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/basel2053/sprint-poker/config"
	database "github.com/basel2053/sprint-poker/db"
	"github.com/basel2053/sprint-poker/helpers"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/jackc/pgx/v5"
)

type credentials struct {
	Email       string `json:"email" validate:"required,email"`
	Password    string `json:"password" validate:"required,min=8,max=32"`
	DisplayName string `json:"display_name" validate:"required,max=50"`
}

func signup(c *gin.Context) {
	user := &credentials{}
	if err := c.BindJSON(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	signupLogger := slog.With("method", "signup", "email", user.Email)

	_, err := config.Queries.GetUserByEmail(c, user.Email)
	if err != pgx.ErrNoRows {
		if err == nil {
			signupLogger.Warn("email already exists")
			c.JSON(http.StatusConflict, gin.H{"message": "email already exists"})
			return
		}
		signupLogger.Error("failed to get user", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	hashedPassword, err := helpers.HashPassword(user.Password)
	if err != nil {
		signupLogger.Error("password hashing failed", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	createdUser, err := config.Queries.CreateUser(c, database.CreateUserParams{
		ID:          uuid.New(),
		Email:       user.Email,
		Password:    hashedPassword,
		DisplayName: user.DisplayName,
	})
	if err != nil {
		signupLogger.Error("failed to save new user", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": fmt.Sprintf("couldn't create user: %s", err)})
		return
	}
	signupLogger.Info("new user created", "id", createdUser.ID)

	c.JSON(http.StatusCreated, gin.H{
		"message": "user created",
		"user":    createdUser,
	})
}

func login(c *gin.Context) {}

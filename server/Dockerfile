FROM golang:1.22-alpine 

WORKDIR /app

RUN go install github.com/cosmtrek/air@v1.27.3

COPY go.mod go.sum ./

RUN go mod download && go mod verify

CMD ["air"]

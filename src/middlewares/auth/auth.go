package auth

import (
	"bytes"
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"scratchuniversity/apps/db"
	"scratchuniversity/apps/response"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// AuthenticationMiddleware implements the authentication
func AuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		url := c.Request.URL
		fullPath := url.EscapedPath()
		noAuthRoutes := []string{
			"/",
			"/forgetPassword",
			"/create",
			"/gmailcallback",
			"/api/v1/verify",
			"/api/v1/createAccount",
			"/api/v1/loginAccount",
			"/api/v1/forgetPassword",
		}
		for _, noAuthRoute := range noAuthRoutes {
			if fullPath == noAuthRoute {
				c.Next()
				return
			}
			// Check if it's achunk.css or chunk.js or chunk.css.map
			if strings.Contains(fullPath, ".chunk.js") || strings.Contains(fullPath, ".chunk.css") || strings.Contains(fullPath, "manifest.json") || strings.Contains(fullPath, "favicon.ico") || strings.Contains(fullPath, ".png") || strings.Contains(fullPath, ".svg") {
				c.Next()
				return
			}
		}
		// Auth needed. Get from cookies or headers
		cookieXToken, _ := c.Cookie("x-token")
		headerXToken := c.GetHeader("x-token")
		// No cookie and header
		if cookieXToken == "" && headerXToken == "" {
			// redirect to login page if non api route, if api route show unauthorized error json.
			abort(c, fullPath, "Empty token")
		}
		// Got cookie no header
		if cookieXToken != "" && headerXToken == "" {
			verifyToken(cookieXToken, c, fullPath)
		}
		// No cookie got header
		if cookieXToken == "" && headerXToken != "" {
			verifyToken(headerXToken, c, fullPath)
		}
		// if Both have
		if cookieXToken != "" && headerXToken != "" {
			verifyToken(cookieXToken, c, fullPath)
		}

		return
	}
}

func verifyToken(tokenFromClient string, c *gin.Context, fullPath string) {
	tk := &db.Token{}
	acc := &db.Account{}
	if tokenFromClient != "" {
		splitArray := strings.Split(tokenFromClient, " ")
		if len(splitArray) != 2 {
			response.ErrorResponse(c, http.StatusInternalServerError, "Ensure the token is in Bearer {} format")
		}
		tokenString := splitArray[1]
		token, err := jwt.ParseWithClaims(tokenString, tk, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("token_password")), nil
		})
		if err != nil {
			log.Printf("Failed to go to dashboard as %s\n", err.Error())
			abort(c, fullPath, err.Error())
			return
		}
		// PARSE THE REQEUST PAYLOAD INTO AN ACCOUNT STRUCT. VERIFY AGAINST TOKEN
		var bodyBytes []byte
		if c.Request.Body != nil {
			bodyBytes, _ = ioutil.ReadAll(c.Request.Body)
		}
		c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))
		json.Unmarshal(bodyBytes, acc)

		// verify if token and account provided the same. Only use for APi requests
		if strings.Contains(fullPath, "api") {
			err = verifyAccount(acc, tk, fullPath)
			if err != nil {
				log.Println("token provided and account in payload dont match")
				abort(c, fullPath, err.Error())
			}
		}
		if !token.Valid {
			log.Println("Failed to go to dashbaord as the jwt token is invalid")
			abort(c, fullPath, err.Error())
		}
		c.Next()
		return
	}
	c.Next()
}

func abort(c *gin.Context, fullPath string, message string) {
	if strings.Contains(fullPath, "api") {
		response.ErrorResponse(c, http.StatusUnauthorized, message)
	}
	c.Redirect(http.StatusPermanentRedirect, "/")
}

// Check that the account of payload and account of token is the same
func verifyAccount(acc *db.Account, tk *db.Token, fullPath string) error {
	// Routes that don't need to have same acc.email and token email
	noSameRoutes := []string{
		"/api/v1/getAccountDetails",
	}
	for _, noSameRoute := range noSameRoutes {
		if fullPath == noSameRoute {
			return nil
		}
	}
	// Check if token the same
	if acc.Email != tk.Email {
		return errors.New("The token specifies a different user than the user in the request payload")
	}
	return nil
}

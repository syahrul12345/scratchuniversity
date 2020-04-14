package api

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"scratchuniversity/apps/db"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
)

const gmailEndpoint string = "http://localhost:9000/verification/sendVerificationEmail"

// Token is the JWT token for parsing.
type Token struct {
	Email string
	jwt.StandardClaims
}

func getAccountFromHeader(header string) (*db.Account, error) {
	tk := &db.Token{}
	acc := &db.Account{}
	splitArray := strings.Split(header, " ")
	if len(splitArray) != 2 {
		return nil, errors.New("Ensure the token is in Bearer {} format")
	}
	tokenString := splitArray[1]
	jwt.ParseWithClaims(tokenString, tk, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("token_password")), nil
	})
	err := db.GetDB().Where("email = ?", tk.Email).First(acc).Error
	if err == gorm.ErrRecordNotFound {
		return nil, errors.New("No such account")
	}
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}
	return acc, nil
}

// sends a verification request to the email microservice.
func sendVerificationEmail(email string) error {
	log.Printf("Attempting to send verification email to %s\n", email)
	type requestVerificationBody struct {
		Email string `json:"email"`
	}

	// Create the payload and form the reader
	payload := &requestVerificationBody{
		Email: email,
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	token := createAuthorizationToken(string(payloadBytes))
	payloadReader := bytes.NewReader(payloadBytes)

	// Set up our HTTP client which will be doing the call
	c := http.Client{}
	req, err := http.NewRequest("POST", gmailEndpoint, payloadReader)
	req.Header.Add("Authorization", token)
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// If not 200, we read the error message for logging purpose
	if resp.StatusCode != 200 {
		// Parse to see the error
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Println(err)
		}
		log.Println(string(body))
	}
	return nil
}

func createAuthorizationToken(payload string) string {
	fullPath := "/verification/sendVerificationEmail"
	secretKey := os.Getenv("INTERNAL_SECRET_KEY")
	dataList := []string{fullPath, payload, secretKey}
	concatonatedData := strings.Join(dataList, "")

	sha := sha256.Sum256([]byte(concatonatedData))
	shaString := hex.EncodeToString(sha[:])
	return "Bearer " + shaString
}

func verifyToken(tokenString string) (*Token, error) {
	tk := &Token{}
	token, err := jwt.ParseWithClaims(tokenString, tk, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, err
	}
	return tk, nil
}

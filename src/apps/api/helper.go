package api

import (
	"errors"
	"os"
	"scratchuniversity/apps/db"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
)

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

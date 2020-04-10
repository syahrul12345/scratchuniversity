package db

import (
	"github.com/jinzhu/gorm"
)

// CreditCard struct
type CreditCard struct {
	gorm.Model
	CardNumber string
	CardExpiry string
	CardCCV    string
	Tags       []byte
	UserID     int
}

func createNewCreditCard(userID uint, tags []string) (*CreditCard, error) {
	creditCard := &CreditCard{
		CardNumber: "98765432210",
		CardExpiry: "43/21",
		CardCCV:    "321",
		UserID:     int(userID),
	}
	err := GetDB().Create(creditCard).Error
	if err != nil {
		return nil, err
	}
	return creditCard, nil

}

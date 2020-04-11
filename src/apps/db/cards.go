package db

import (
	"github.com/jinzhu/gorm"
)

// CreditCard struct
type CreditCard struct {
	gorm.Model
	CardNumber   string
	CardExpiry   string
	CardCCV      string
	Tag          string
	Transactions []Transaction `gorm:"foreignkey:CreditCardID"`
	UserID       int
}

func createNewCreditCard(userID uint, tag string) (*CreditCard, error) {
	creditCard := &CreditCard{
		CardNumber: "98765432210",
		CardExpiry: "43/21",
		CardCCV:    "321",
		UserID:     int(userID),
		Tag:        tag,
	}
	err := GetDB().Create(creditCard).Error
	if err != nil {
		return nil, err
	}
	return creditCard, nil

}

// GetTransactions returns the transactions of the provided card
func (c *CreditCard) GetTransactions() (*[]Transaction, error) {
	// First get the credit card
	err := GetDB().Model(c).Where("card_number = ?", c.CardNumber).First(c).Error
	if err != nil {
		return nil, err
	}

	transactions := &[]Transaction{}
	err = GetDB().Model(c).Related(transactions, "Transactions").Error
	if err != nil {
		return nil, err
	}
	return transactions, err
}

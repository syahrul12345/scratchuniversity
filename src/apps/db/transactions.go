package db

import "github.com/jinzhu/gorm"

// Transaction for a credit card
type Transaction struct {
	gorm.Model
	Date         string
	Name         string
	Value        float64
	CreditCardID int
}

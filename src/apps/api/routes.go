package api

import (
	"log"
	"net/http"
	"scratchuniversity/apps/db"
	"scratchuniversity/apps/response"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type cardRequestPayload struct {
	Email string `json:"Email"`
	Tag   string `json:"Tag"`
}

func createAccountHandler(c *gin.Context) {
	/***
		Incoming payload looks like
		{
			email: syahrul@example.com
			password: somepassword
		}
	***/
	account := &db.Account{}
	err := c.ShouldBindBodyWith(account, binding.JSON)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	// Crate the account
	err = account.Create()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"account": account,
	})
}

func loginAccountHandler(c *gin.Context) {
	/***
		Incoming payload looks like
		{
			email: syahrul@example.com
			password: somepassword
		}
	***/
	account := &db.Account{}
	err := c.ShouldBindBodyWith(account, binding.JSON)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	// Login the account
	err = account.Login()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	// Return the account details with token
	c.JSON(http.StatusOK, gin.H{
		"account": account,
	})
}

func changePasswordHandler(c *gin.Context) {
	/***
		Incoming payload looks like
		{
			email: syahrul@example.com
			password: somepassword
			newPassword: newPassword
		}
	***/
	newAccount := &db.NewAccount{}
	err := c.ShouldBindBodyWith(newAccount, binding.JSON)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	account := &db.Account{}
	account.Email = newAccount.Email
	account.Password = newAccount.Password

	if newAccount.NewPassword == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "New Password cannot be empty",
		})
		return
	}
	// Change the account password
	err = account.ChangePassword(newAccount.NewPassword)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succesfully changed password, you can login now",
	})
	// Change the password

}

func forgetPasswordHandler(c *gin.Context) {
	/***
		Incoming payload looks like
		{
			email: syahrul@example.com
		}
	***/
	account := &db.Account{}
	c.ShouldBindWith(account, binding.JSON)

	err := account.Exists()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "An email has been sent to your account to reset your password",
	})
}

// Request a cookie from the header
func getAccountDetailHandler(c *gin.Context) {
	xToken := c.GetHeader("x-token")
	if xToken == "" {
		// No cookie found, unauthorized route.
		log.Println("No cookie found")
		response.ErrorResponse(c, http.StatusUnauthorized, "Empty cookie")
		return
	}
	acc, err := getAccountFromHeader(xToken)
	if err != nil {
		// No cookie found, unauthorized route.
		log.Println("invalid cookie")
		response.ErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}
	// Clear the password
	acc.Password = ""
	response.SuccessResponse(c, acc)
	return
}

// createNewBnkCardHandler Creates a new bank card for the user
func createNewBnkCardHandler(c *gin.Context) {
	// This is an authenticated route. Need token. Expect email to be sent
	/***
		Payload will look like this
		{
			account: syahrul@syahrul.com
			tags: []
		}
	***/
	account := &db.Account{}
	cardReq := &cardRequestPayload{}
	c.ShouldBindWith(cardReq, binding.JSON)

	account.Email = cardReq.Email
	_, err := account.CreateNewCard(cardReq.Tag)
	if err != nil {
		response.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	creditCards, err := account.GetCards()
	if err != nil {
		response.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	response.SuccessResponse(c, creditCards)
}

// This function simply returns all cards owned by the user
func getBankCardsHandler(c *gin.Context) {
	// This is an authenticated route. Need token. Expect email to be sent
	/***
		Payload will look like this
		{
			account: syahrul@syahrul.com
		}
	***/
	account := &db.Account{}
	c.ShouldBindWith(account, binding.JSON)

	creditCards, err := account.GetCards()
	if err != nil {
		response.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	response.SuccessResponse(c, creditCards)
}

// This function returns the transactions for a particular card
func getCardTransactionsHandler(c *gin.Context) {
	/***
		Payload will look like this
		{
			ID:
			Email:
			CardNumber:
		}
	***/
	type request struct {
		Email      string
		CardNumber string
	}
	req := &request{}
	c.ShouldBindWith(req, binding.JSON)

	creditCard := &db.CreditCard{}
	creditCard.CardNumber = req.CardNumber

	transactions, err := creditCard.GetTransactions()
	if err != nil {
		response.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.SuccessResponse(c, transactions)
}

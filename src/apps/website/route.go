package website

import (
	"io/ioutil"
	"log"
	"os"

	"github.com/davecgh/go-spew/spew"
	"github.com/gin-gonic/gin"
)

func websiteHandler(c *gin.Context) {
	isProduction := os.Getenv("is_production")
	// let react handle the website
	if isProduction == "false" {
		c.File("./website/build/index.html")
	} else {
		c.File("./build/index.html")
	}
}

func gmailHandler(c *gin.Context) {
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Println(err)
	}
	spew.Dump(string(body))
}

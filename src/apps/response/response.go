package response

import "github.com/gin-gonic/gin"

// SuccessResponse send the success to the response payload to client
func SuccessResponse(c *gin.Context, obj interface{}) {
	c.JSON(200, gin.H{
		"data": obj,
	})
}

// ErrorResponse writes the error to the response payload to client
func ErrorResponse(c *gin.Context, statuscode int, message string) {
	c.AbortWithStatusJSON(statuscode, gin.H{
		"error": message,
	})
}

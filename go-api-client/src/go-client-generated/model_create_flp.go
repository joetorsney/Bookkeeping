/*
 * ALICE Bookkeeping
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: 0.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

// Describes an flp
type CreateFlp struct {
	Name string `json:"name"`
	Hostname string `json:"hostname"`
	RunNumber int64 `json:"runNumber,omitempty"`
}
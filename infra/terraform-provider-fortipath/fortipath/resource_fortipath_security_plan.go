package fortipath

import (
	"github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema"
)

// TODO: Define the resource schema for FortiPath Security Plan
func resourceFortiPathSecurityPlan() *schema.Resource {
	return &schema.Resource{
		Create: resourceFortiPathSecurityPlanCreate,
		Read:   resourceFortiPathSecurityPlanRead,
		Update: resourceFortiPathSecurityPlanUpdate,
		Delete: resourceFortiPathSecurityPlanDelete,

		Schema: map[string]*schema.Schema{
			"plan_name": {
				Type:     schema.TypeString,
				Required: true,
			},
			"plan_description": {
				Type:     schema.TypeString,
				Optional: true,
			},
			// Add other fields as necessary
		},
	}
}

func resourceFortiPathSecurityPlanCreate(d *schema.ResourceData, m interface{}) error {
	// TODO: Implement the logic to create a security plan in FortiPath
	// Placeholder function for now

	return nil
}

// Similarly, implement the Read, Update, and Delete functions


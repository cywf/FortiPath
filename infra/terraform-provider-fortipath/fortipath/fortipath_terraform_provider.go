// fortipath_terraform_provider Module
// Description: Module for managing the FortiPath Terraform provider.

package fortipath

import (
	"github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema"
	"github.com/hashicorp/terraform-plugin-sdk/v2/terraform"
)

// Provider returns a *schema.Provider for FortiPath.
func Provider() *schema.Provider {
	return &schema.Provider{
		Schema: map[string]*schema.Schema{
			"api_endpoint": {
				Type:        schema.TypeString,
				Required:    true,
				DefaultFunc: schema.EnvDefaultFunc("FORTIPATH_API_ENDPOINT", nil),
				Description: "The endpoint for the FortiPath API.",
			},
			"api_token": {
				Type:        schema.TypeString,
				Required:    true,
				Sensitive:   true,
				DefaultFunc: schema.EnvDefaultFunc("FORTIPATH_API_TOKEN", nil),
				Description: "The API token for FortiPath.",
			},
		},

		ResourcesMap: map[string]*schema.Resource{
			"fortipath_security_plan":               resourceSecurityPlan(),
			"fortipath_vulnerability_assessment":    resourceVulnerabilityAssessment(),
			// ... Add other resources here
		},

		DataSourcesMap: map[string]*schema.Resource{
			"fortipath_threat_analysis": dataSourceThreatAnalysis(),
			// ... Add other data sources here
		},

		ConfigureContextFunc: providerConfigure,
	}
}

func providerConfigure(ctx context.Context, d *schema.ResourceData) (interface{}, diag.Diagnostics) {
	apiEndpoint := d.Get("api_endpoint").(string)
	apiToken := d.Get("api_token").(string)

	// TODO: Initialize the FortiPath client with the provided API endpoint and token.

	return client, nil
}

// TODO: Implement the resource and data source functions like resourceSecurityPlan(), dataSourceThreatAnalysis(), etc.


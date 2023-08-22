package main

import (
	"github.com/hashicorp/terraform-plugin-sdk/v2/plugin"
	"github.com/cywf/FortiPath/infra/terraform-provider-fortipath/fortipath"
)

func main() {
	// Register the FortiPath provider with Terraform
	plugin.Serve(&plugin.ServeOpts{
		ProviderFunc: fortipath.Provider,
	})
}

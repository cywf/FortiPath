# Variable definitions for content_delivery_caching

# Content Delivery & Caching Module - variables.tf

# Variable for CloudFront origin domain name
variable "origin_domain_name" {
  description = "The domain name of the origin for CloudFront"
  type        = string
}

# Variable for Elasticache node type
variable "elasticache_node_type" {
  description = "The compute and memory capacity of the nodes in the node group"
  type        = string
  default     = "cache.m4.large"
}

# TODO: Define variables for CloudFront configurations, such as price class, SSL certificate, etc.
# TODO: Define variables for Elasticache configurations, such as port, maintenance window, etc.

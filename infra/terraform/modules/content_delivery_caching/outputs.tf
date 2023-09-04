# Output definitions for content_delivery_caching

# Content Delivery & Caching Module - outputs.tf

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.fortipath_distribution.id
}

output "cloudfront_distribution_domain_name" {
  description = "The domain name corresponding to the CloudFront distribution"
  value       = aws_cloudfront_distribution.fortipath_distribution.domain_name
}

output "elasticache_endpoint" {
  description = "The connection endpoint for the Elasticache cluster"
  value       = aws_elasticache_cluster.fortipath_cache.cache_nodes.0.address
}

# TODO: Add outputs for CloudFront alternate domain names (CNAMEs), Elasticache port, and other related resources.

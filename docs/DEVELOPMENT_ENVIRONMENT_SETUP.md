# FortiPath Development Environment Setup Guide

## Overview

This guide provides comprehensive instructions for setting up a development environment for the FortiPath executive protection and security planning toolkit. FortiPath is designed to provide full automation and robust security features for executive protection professionals.

**Environment Name:** FortiPath Revamp Assistant  
**Description:** An AI-powered development environment for analyzing and upgrading the FortiPath executive protection toolkit.  
**Repository:** https://github.com/cywf/FortiPath

---

## Prerequisites

### System Requirements
- **Operating System:** Linux (Ubuntu 20.04+), macOS, or Windows with WSL2
- **RAM:** Minimum 8GB (16GB recommended)
- **Disk Space:** At least 10GB free space
- **Internet Connection:** Required for downloading dependencies and API access

### Required Software Versions
- **Python:** 3.11+ (Python 3.12+ recommended)
- **Rust:** 1.70+ (stable toolchain)
- **Go:** 1.20+ (for Terraform provider development)
- **Terraform:** 1.5+
- **Git:** 2.30+
- **Docker:** 20.10+ (optional, for containerization)

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/cywf/FortiPath.git
cd FortiPath
```

### 2. Python Environment Setup

#### Install Python Dependencies
Currently, FortiPath scripts use primarily standard library modules. However, for future enhancements, we'll create a comprehensive requirements file.

```bash
# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install/upgrade pip
pip install --upgrade pip

# Install planned dependencies (see requirements.txt below)
pip install -r requirements.txt
```

#### Create requirements.txt
A `requirements.txt` file should be created with the following dependencies:

```
# Core dependencies
requests>=2.31.0
beautifulsoup4>=4.12.0
lxml>=5.1.0

# Google Maps API integration
googlemaps>=4.10.0

# Data analysis and visualization
pandas>=2.1.0
matplotlib>=3.8.0
seaborn>=0.13.0

# OSINT and security tools
python-whois>=0.8.0
dnspython>=2.4.0

# AI/ML integration
openai>=1.3.0

# Communication and API
python-telegram-bot>=20.6
slack-sdk>=3.23.0

# Database support
sqlalchemy>=2.0.0
psycopg2-binary>=2.9.0

# Configuration management
python-dotenv>=1.0.0
pyyaml>=6.0.1

# Testing and quality
pytest>=7.4.0
pytest-cov>=4.1.0
black>=23.10.0
flake8>=6.1.0
mypy>=1.6.0

# Security scanning
bandit>=1.7.5
safety>=2.3.5
```

### 3. Rust Environment Setup

#### Install Rust Toolchain
```bash
# Install rustup (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Update Rust to latest stable
rustup update stable
rustup default stable

# Verify installation
rustc --version
cargo --version
```

#### Configure Rust Projects
FortiPath contains two Rust modules that need dependencies:

```bash
# Navigate to OSINT crawler
cd infra/rust/fortipath_osint_crawler

# Add required dependencies
cargo add tokio --features full
cargo add tokio-stream
cargo add reqwest --features json
cargo add scraper
cargo add select
cargo add url

# Build to verify
cargo build

# Navigate to behavioral analysis module
cd ../fortipath_behavioral_analysis

# Add dependencies for ML/analysis
cargo add serde --features derive
cargo add serde_json

# Build to verify
cargo build

# Return to root
cd ../../..
```

### 4. Go Environment Setup (for Terraform Provider)

#### Install Go
```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install golang-go

# On macOS
brew install go

# Verify installation
go version
```

#### Configure Terraform Provider
```bash
cd infra/terraform-provider-fortipath

# Initialize Go module (if go.mod doesn't exist)
go mod init github.com/cywf/FortiPath/infra/terraform-provider-fortipath

# Add Terraform SDK dependencies
go get github.com/hashicorp/terraform-plugin-sdk/v2
go mod tidy

# Build provider
go build -o terraform-provider-fortipath

cd ../..
```

### 5. Terraform Setup

#### Install Terraform
```bash
# On Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt-get update
sudo apt-get install terraform

# On macOS
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Verify installation
terraform --version
```

#### Initialize Terraform Configuration
```bash
cd infra/terraform
terraform init
cd ../..
```

### 6. Optional: Docker Setup

For containerized deployments:

```bash
# Install Docker (Ubuntu/Debian)
sudo apt-get install docker.io docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker-compose --version
```

---

## Environment Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# API Keys (obtain from respective providers)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# ZeroTier Configuration
ZEROTIER_API_TOKEN=your_zerotier_api_token_here
ZEROTIER_NETWORK_ID=your_network_id_here

# TAK Server Configuration
TAK_SERVER_URL=https://your-tak-server.example.com
TAK_SERVER_API_KEY=your_tak_api_key_here

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/fortipath
POSTGRES_USER=fortipath
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB=fortipath

# Communication APIs
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here

# Security Settings
SECRET_KEY=your_secret_key_for_encryption
JWT_SECRET=your_jwt_secret_here

# Development Settings
DEBUG=true
LOG_LEVEL=INFO
ENVIRONMENT=development
```

### Secrets Management

**Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

For production environments, use:
- **GitHub Secrets:** For CI/CD workflows
- **HashiCorp Vault:** For secret management
- **AWS Secrets Manager / Azure Key Vault:** For cloud deployments

### Allowed Domains

The following domains should be accessible for full functionality:
- `github.com` - Repository access and API
- `pypi.org` - Python package installation
- `crates.io` - Rust crate downloads
- `maps.googleapis.com` - Google Maps API
- `api.openai.com` - OpenAI API for AI-powered features
- `my.zerotier.com` - ZeroTier network management
- `nominatim.openstreetmap.org` - OpenStreetMap geocoding (free alternative)

---

## Verification Steps

### 1. Verify Python Environment
```bash
# Activate virtual environment
source venv/bin/activate

# Test a sample script
python scripts/report-writing/After_Action_Reviews.py
```

### 2. Verify Rust Modules
```bash
# Test OSINT crawler compilation
cd infra/rust/fortipath_osint_crawler
cargo check

# Test behavioral analysis compilation
cd ../fortipath_behavioral_analysis
cargo check

cd ../../..
```

### 3. Verify Terraform Configuration
```bash
cd infra/terraform
terraform validate
cd ../..
```

### 4. Run Basic Tests
```bash
# Python style check (once flake8 is installed)
flake8 scripts/ --max-line-length=120

# Security scan (once bandit is installed)
bandit -r scripts/ -ll

# Run any existing tests
pytest tests/ -v
```

---

## Development Workflow

### Daily Development Setup
```bash
# 1. Update repository
git pull origin main

# 2. Activate Python environment
source venv/bin/activate

# 3. Update dependencies if needed
pip install -r requirements.txt --upgrade
cargo update
go mod tidy

# 4. Run linters before committing
black scripts/
flake8 scripts/
```

### Running FortiPath Components

#### Report Writing Scripts
```bash
cd scripts/report-writing
python After_Action_Reviews.py
python Threat_Assessment.py
# ... other scripts
```

#### Route Planning
```bash
cd scripts/route-planning
# Configure API key first
export GOOGLE_MAPS_API_KEY=your_key
python route_planning_script.py
```

#### OSINT Crawler
```bash
cd infra/rust/fortipath_osint_crawler
cargo run --release
```

---

## Troubleshooting

### Common Issues

#### Python Module Not Found
```bash
# Ensure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

#### Rust Compilation Errors
```bash
# Update Rust toolchain
rustup update

# Clean and rebuild
cargo clean
cargo build
```

#### Terraform Provider Issues
```bash
# Reinitialize Terraform
cd infra/terraform
rm -rf .terraform
terraform init
```

#### Permission Denied Errors
```bash
# On Linux/macOS, ensure scripts are executable
chmod +x scripts/**/*.py
```

---

## Next Steps

After completing the environment setup:
1. Review the [UPGRADE_PLAN.md](./UPGRADE_PLAN.md) for development roadmap
2. Check the [Contributing Guide](./Contributing.md) for contribution guidelines
3. Explore the [Wiki](https://github.com/cywf/FortiPath/wiki) for detailed documentation
4. Join the [Discussions](https://github.com/cywf/FortiPath/discussions) for community support

---

## Maintenance

### Regular Updates
```bash
# Weekly: Update all dependencies
pip install -r requirements.txt --upgrade
cargo update
rustup update
terraform version  # Check for updates

# Monthly: Security audit
bandit -r scripts/
safety check
cargo audit  # Install with: cargo install cargo-audit
```

### CI/CD Integration
FortiPath uses GitHub Actions for automation. See `.github/workflows/` for existing workflows.

---

## Support

For issues or questions:
- **GitHub Issues:** https://github.com/cywf/FortiPath/issues
- **Discussions:** https://github.com/cywf/FortiPath/discussions
- **Maintainer:** [Kylo Parisher](https://linkedin.com/in/kparisher)

---

*Last Updated: 2025-10-25*  
*Document Version: 1.0*

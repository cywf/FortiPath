# FortiPath: Comprehensive Security Planning

![alt text](assets/images/fortipath_art.png)

[![Status](https://img.shields.io/badge/Status-Active%20Development-yellow)](https://github.com/cywf/FortiPath)
[![Version](https://img.shields.io/badge/Version-0.1.0%20→%201.0.0-blue)](https://github.com/cywf/FortiPath/releases)
[![License](https://img.shields.io/badge/License-Dual%20Licensed-green)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![Rust](https://img.shields.io/badge/Rust-2021-orange)](https://www.rust-lang.org/)
[![Go](https://img.shields.io/badge/Go-1.19+-cyan)](https://golang.org/)

<!--
Initial Readme
Date: 2023-07-20
Auth: Kylo Parisher (cywf)

Updated Readme
Date: 2023-08-12
Auth: Kylo Parisher (cywf)

Development Revival Update
Date: 2025-10-25
Auth: Kylo Parisher (cywf)
Status: Active Development - Comprehensive modernization and feature completion in progress

Latest Update
Date: 2025-10-25
Auth: Kylo Parisher (cywf)
Update: Enhanced README with comprehensive feature list and improved documentation structure
-->

# FortiPath

**Status:** 🚧 Active Development | **Version:** 0.1.0 → 1.0.0 (in progress)

FortiPath is a comprehensive executive protection toolkit designed to enhance the safety, efficiency, and effectiveness of protection details. By leveraging state-of-the-art technologies and methodologies—including AI-powered threat analysis, OSINT web crawling, and advanced route planning—FortiPath aims to revolutionize the executive protection industry.

> **Note:** FortiPath is currently undergoing a comprehensive modernization effort. See the [Upgrade Plan](docs/UPGRADE_PLAN.md) for details on features being developed.

## 🎯 Mission

To provide executive protection professionals with a modern, integrated toolkit that combines threat intelligence, operational planning, and real-time communication capabilities—all while maintaining the highest standards of security and privacy.

## ✨ Features

### Core Capabilities

#### 🔍 Intelligence & Analysis
- **OSINT Web Crawler** (Rust) - High-performance web crawling for threat intelligence gathering
- **Risk Assessment** - Dietz Scale implementation for threat evaluation and management
- **Location Assessment** - Comprehensive site surveys and security assessments
- **Physical Reconnaissance** - Detailed physical security evaluations

#### 📝 Report Generation
- **AI-Powered Report Writing** - Automated generation of professional security reports including:
  - Advance Surveys
  - Threat Assessments & Analysis
  - After Action Reviews
  - Incident Reports
  - Travel Security Read-Aheads
  - Vulnerability Assessments
  - Threat Management Plans
  - Estate Security Plans
  - Protective Intelligence Analysis Summaries
  - Professional Emails

#### 🗺️ Operational Planning
- **Route Planning** - Advanced surveillance detection route (SDR) planning with real-time updates
- **Emergency Planning** - Comprehensive emergency response planning tools
- **Disaster Planning** - Natural disaster and crisis management preparation
- **Training & Drills** - Structured training programs and exercise planning

#### 🔐 Security & Communications
- **TAK Server Integration** - Seamless communication between agents and command center
- **ZeroTier Network Security** - Secure, encrypted, private network creation
- **Digital Countermeasures** - Active cyber defense and digital security tools
- **Network Scanning** - Security vulnerability scanning and assessment

#### 🤝 Collaboration & Coordination
- **Law Enforcement Collaboration** - Intelligence sharing and joint operations support
- **Scheduling & Coordination** - Team scheduling and resource management
- **Information Warfare** - Counter-intelligence and information security

#### 🏗️ Infrastructure & Deployment
- **Terraform Infrastructure** - Infrastructure as Code for cloud deployments
- **Custom Terraform Provider** - FortiPath-specific infrastructure automation
- **Docker Containerization** - Portable and scalable deployment options

### Development Status

| Component | Status | Priority |
|-----------|--------|----------|
| OSINT Web Crawler (Rust) | 🔨 In Development | Critical |
| Route Planning & SDR | 🔨 In Development | Critical |
| AI Report Generation | 📋 Planned | High |
| Risk Assessment (Dietz Scale) | 📋 Planned | High |
| Location Assessment Tools | 📋 Planned | High |
| TAK Server Integration | 📋 Planned | Medium |
| Infrastructure Automation | 📋 Planned | Medium |
| Digital Countermeasures | 📋 Planned | Medium |
| Training & Exercise Tools | 📋 Planned | Low |

**Legend:** ✅ Complete | 🔨 In Development | 📋 Planned | ⏸️ On Hold

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+** - Core application runtime
- **Rust (2021 edition)** - For OSINT crawler module
- **Go 1.19+** - For Terraform provider development
- **Terraform 1.0+** - Infrastructure deployment
- **Docker** - Container-based deployments (optional)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/cywf/FortiPath.git
cd FortiPath

# 2. Set up Python environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Explore available scripts
ls scripts/

# 5. Try a sample script (e.g., route planning)
python scripts/route-planning/route_planning_script.py --help
```

For detailed setup instructions, see the [Development Environment Setup Guide](docs/DEVELOPMENT_ENVIRONMENT_SETUP.md).

### 📚 Documentation

| Document | Description |
|----------|-------------|
| [Development Environment Setup](docs/DEVELOPMENT_ENVIRONMENT_SETUP.md) | Complete guide to set up your development environment |
| [Upgrade Plan](docs/UPGRADE_PLAN.md) | Comprehensive 16-week plan to bring FortiPath to v1.0 |
| [Codebase Analysis](docs/CODEBASE_ANALYSIS.md) | Detailed analysis of current state and required work |
| [Executive Summary](EXECUTIVE_SUMMARY.md) | Project revival summary and development roadmap |
| [Contributing Guide](docs/Contributing.md) | How to contribute to FortiPath |
| [Roadmap](docs/roadmap.md) | Project roadmap and milestones |
| [Security Policy](docs/SECURITY.md) | Security vulnerability reporting and policies |
| [Code of Conduct](docs/CODE_OF_CONDUCT.md) | Community guidelines and standards |

## 🏗️ Architecture

### Technology Stack

**Core Application:**
- **Python 3.8+** - Main application logic, scripts, and integrations
- **Rust (2021)** - High-performance OSINT web crawler
- **Go 1.19+** - Custom Terraform provider

**Infrastructure:**
- **Terraform** - Infrastructure as Code (IaC)
- **Docker** - Containerization and deployment
- **ZeroTier** - Secure network overlay

**Integrations:**
- **OpenAI API** - AI-powered report generation
- **Google Maps / OpenStreetMap** - Route planning and mapping
- **TAK Server** - Team Awareness Kit for tactical communications

### Project Structure

```
FortiPath/
├── scripts/              # Python scripts for core functionality
│   ├── report-writing/   # AI-powered report generation
│   ├── route-planning/   # Route and SDR planning
│   ├── location-assessment/  # Site surveys and assessments
│   ├── comms/            # Communication tools
│   ├── collaboration_with_law_enforcement/
│   ├── threat_neutralization/
│   ├── digital_countermeasures/
│   └── ...
├── infra/                # Infrastructure code
│   ├── terraform/        # Terraform modules and configurations
│   └── terraform-provider-fortipath/  # Custom provider
├── docs/                 # Documentation
├── assets/               # Static assets (images, CSS, JS)
└── requirements.txt      # Python dependencies
```

## 🤝 Community and Contributions

FortiPath thrives on community collaboration. We welcome contributions from security professionals, developers, and enthusiasts.

### Ways to Contribute

- 💻 **Code Contributions** - Submit pull requests for new features or bug fixes
- 📖 **Documentation** - Help improve our guides and documentation
- 🐛 **Bug Reports** - Report issues on our [issue tracker](https://github.com/cywf/FortiPath/issues)
- 💡 **Feature Requests** - Suggest new features in [discussions](https://github.com/cywf/FortiPath/discussions)
- 🔍 **Security Reviews** - Help identify security vulnerabilities (see [SECURITY.md](docs/SECURITY.md))

### Resources

- **[Wiki](https://github.com/cywf/FortiPath/wiki)** - Comprehensive guides and explanations
- **[Discussions](https://github.com/cywf/FortiPath/discussions)** - Community Q&A and collaboration
- **[Project Boards](https://github.com/cywf/FortiPath/projects?query=is%3Aopen)** - Track progress and tasks
- **[Issues](https://github.com/cywf/FortiPath/issues)** - Bug reports and feature requests

Please review the [Contributing Guide](docs/Contributing.md) and [Code of Conduct](docs/CODE_OF_CONDUCT.md) before contributing.

## 📋 Roadmap

### Current Phase: Foundation & Core Features (Q4 2025)
- ✅ Development environment setup
- ✅ Comprehensive planning and documentation
- 🔨 OSINT Web Crawler implementation
- 🔨 Route planning and SDR tools
- 📋 AI-powered report generation

### Upcoming Milestones
- **v0.5.0** (Q1 2026) - Core features operational
- **v0.8.0** (Q2 2026) - Infrastructure automation complete
- **v1.0.0** (Q2 2026) - Production-ready release

For detailed roadmap information, see [UPGRADE_PLAN.md](docs/UPGRADE_PLAN.md) and [roadmap.md](docs/roadmap.md).

## 📊 Project Status

**Active Development Areas:**
- OSINT crawler Rust implementation
- Route planning algorithms
- AI report generation templates
- Infrastructure automation
- Documentation updates

**Planned Features:**
- Dietz Scale risk assessment module
- TAK Server integration
- Real-time threat monitoring
- Mobile application companion
- Advanced analytics dashboard

## 🔒 Security

Security is paramount in executive protection. FortiPath follows security best practices:

- 🔐 Secure credential management
- 🛡️ Regular security audits
- 🔄 Dependency vulnerability scanning
- 📝 Responsible disclosure policy

To report security vulnerabilities, please see our [Security Policy](docs/SECURITY.md).

## 📄 License

FortiPath is dual-licensed:
- **Open Source License** - For community and non-commercial use
- **Commercial License** - For enterprise and commercial applications

For more details, see [LICENSE](LICENSE) and [Commercial License](docs/Commercial_License.md).

## 👥 Team

**Project Lead:** [Kylo Parisher](https://linkedin.com/in/kparisher)

FortiPath is maintained by security professionals with extensive experience in executive protection, cybersecurity, and software development.

## 📞 Contact

- **LinkedIn:** [Kylo Parisher](https://linkedin.com/in/kparisher)
- **GitHub Discussions:** [Community Forum](https://github.com/cywf/FortiPath/discussions)
- **Email:** See profile for contact information

## 🌟 Acknowledgments

FortiPath builds upon the expertise of the executive protection community and leverages open-source technologies. We're grateful to all contributors and the broader security community.

---

**⚠️ Disclaimer:** FortiPath is designed as a professional tool for legitimate executive protection operations. Users are responsible for compliance with all applicable laws and regulations.

---

<div align="center">

**[Get Started](docs/DEVELOPMENT_ENVIRONMENT_SETUP.md)** • **[Documentation](docs/)** • **[Contributing](docs/Contributing.md)** • **[Community](https://github.com/cywf/FortiPath/discussions)**

Made with ❤️ for the Executive Protection Community

</div>

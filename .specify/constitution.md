# Constitution

## Purpose

FortiPath serves as a comprehensive executive protection toolkit designed to enhance the safety, efficiency, and effectiveness of protection details through specification-driven development. This repository follows the Spec-Kit framework to ensure all development is well-documented, traceable, and aligned with executive protection industry standards.

## Principles

1. **Specification-Driven Development**
All development begins with clear specifications. Code implements specifications, not vice versa. This ensures that every feature serves a documented security or operational purpose.

2. **Security First**
Executive protection requires the highest security standards. All code, data handling, and communications must follow security best practices including:
- Secure credential management
- Input validation and sanitization
- Encryption for sensitive data
- Regular security audits
- Responsible vulnerability disclosure

3. **Multi-Language Architecture**
FortiPath leverages multiple programming languages for optimal performance and maintainability:
- **Python 3.8+** - Main application logic, scripts, and API integrations
- **Rust (2021 edition)** - High-performance OSINT web crawler and security-critical components
- **Go 1.19+** - Custom Terraform provider for infrastructure automation

4. **Production Ready**
All implementations must be:
- Testable with comprehensive test coverage
- Well-documented for both users and developers
- Deployable in multiple environments (cloud and self-hosted)
- Maintainable with clear code structure and documentation

5. **Privacy and Compliance**
Executive protection involves sensitive data. All features must:
- Respect privacy regulations
- Implement data minimization
- Provide audit trails
- Support secure data deletion

6. **Incremental Planning**
Work is broken down into discrete, manageable tasks that can be tracked and validated independently through the tasks directory.

7. **Automation First**
Repetitive processes are automated through workflows, scripts, and CI/CD pipelines, reducing manual effort and human error.

8. **Documentation as Code**
Documentation lives alongside code, versioned and reviewed through the same processes. Documentation must be updated concurrently with code changes.

## Structure

### Core Specification Directory
```
/.specify
├── constitution.md       # This file - project principles and governance
├── spec.md              # Technical specifications and requirements
├── plan.md              # High-level implementation plan
└── tasks/               # Individual task specifications
```

### Repository Structure
```
/
├── .specify/            # Specification framework
├── .github/workflows/   # Automation workflows including spec-kit validation
├── scripts/             # Python scripts for core functionality
├── infra/               # Infrastructure as code (Terraform, Docker, K8s)
├── docs/                # Comprehensive documentation
├── assets/              # Static assets
└── requirements.txt     # Python dependencies
```

## Technology Standards

### Python Development
- Python 3.8+ required (3.11+ recommended)
- Type hints required for all functions
- Black for code formatting
- Pytest for testing (minimum 80% coverage)
- Pylint and mypy for code quality

### Rust Development
- Rust 2021 edition required
- Clippy for linting
- cargo test for testing
- Security-focused: no unsafe code without justification

### Go Development
- Go 1.19+ for Terraform provider only
- Go fmt for formatting
- Go test for testing

### Testing Requirements
- Unit tests for all core functionality
- Integration tests for API interactions
- Security tests for input validation
- Minimum 80% code coverage before v1.0 release

### Security Standards
- No hardcoded credentials or API keys
- Use environment variables or secure vaults
- Input validation on all user inputs
- Regular dependency updates and vulnerability scanning
- Bandit security scanning for Python code

## Governance

### Specification Changes
Changes to constitution, spec, or plan require:
1. Documented rationale for the change
2. Review by project maintainers
3. Update of affected tasks and documentation
4. Approval before implementation

### Code Changes
All code changes must:
1. Reference a task or specification
2. Include appropriate tests
3. Pass all CI/CD checks
4. Be reviewed before merging
5. Update documentation as needed

### Branch Strategy
- `main` - Production-ready code
- Feature branches for development
- All changes via pull requests

## Adaptability

While this constitution establishes core principles, it can be updated as the project evolves. However, changes must be deliberate, documented, and approved to maintain project stability.

## Executive Protection Focus

FortiPath is designed for legitimate executive protection operations. All features and implementations must:
- Serve a valid executive protection purpose
- Comply with applicable laws and regulations
- Respect privacy and civil rights
- Be ethically defensible

Users are responsible for ensuring their use of FortiPath complies with all applicable laws and professional standards.

## Community Standards

FortiPath welcomes contributions from security professionals, developers, and the EP community. All contributors must:
- Follow the Code of Conduct
- Respect the constitution and specifications
- Submit quality, tested code
- Document their contributions
- Maintain professional standards

## Success Criteria

The project is considered successful when:
- All specifications are implemented and tested
- Code coverage meets minimum standards
- Documentation is complete and accurate
- Security audits pass
- The toolkit serves real executive protection needs
- The community is active and engaged

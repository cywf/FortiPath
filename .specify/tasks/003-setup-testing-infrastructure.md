# Task: 003 - Setup Testing Infrastructure

## Objective

Establish a comprehensive testing infrastructure for FortiPath including unit tests, integration tests, and code coverage reporting. This ensures code quality and enables continuous integration.

## Requirements

- [ ] Set up pytest framework with configuration
- [ ] Create test directory structure
- [ ] Add example unit tests for existing code
- [ ] Configure test coverage reporting (pytest-cov)
- [ ] Set up Rust testing framework (cargo test)
- [ ] Create CI/CD workflow for automated testing
- [ ] Document testing standards and practices
- [ ] Achieve baseline code coverage measurement

## Implementation Notes

### Directory Structure

```
FortiPath/
├── tests/
│   ├── __init__.py
│   ├── unit/
│   │   ├── __init__.py
│   │   ├── test_report_writing.py
│   │   ├── test_route_planning.py
│   │   └── ...
│   ├── integration/
│   │   ├── __init__.py
│   │   ├── test_openai_integration.py
│   │   ├── test_maps_integration.py
│   │   └── ...
│   ├── fixtures/
│   │   └── sample_data.py
│   └── conftest.py
├── pytest.ini
└── .coveragerc
```

### Pytest Configuration

Create `pytest.ini`:
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    --verbose
    --cov=scripts
    --cov-report=html
    --cov-report=term-missing
    --cov-fail-under=80
```

### Coverage Configuration

Create `.coveragerc`:
```ini
[run]
source = scripts
omit = 
    */tests/*
    */venv/*
    */__pycache__/*

[report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
    if __name__ == .__main__.:
```

### Example Unit Test

```python
# tests/unit/test_route_planning.py
import pytest
from scripts.route_planning.route_planning_script import calculate_route

def test_calculate_route_basic():
    """Test basic route calculation"""
    origin = "New York, NY"
    destination = "Boston, MA"
    # Mock the API call
    result = calculate_route(origin, destination)
    assert result is not None
    assert 'route' in result

def test_calculate_route_invalid_input():
    """Test route calculation with invalid input"""
    with pytest.raises(ValueError):
        calculate_route(None, None)
```

### Rust Testing

For Rust modules in `infra/rust/`:
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_osint_crawler_basic() {
        // Test OSINT crawler functionality
        let result = crawl_url("https://example.com");
        assert!(result.is_ok());
    }
}
```

### CI/CD Integration

Create GitHub Actions workflow for testing:
```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-python:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.8', '3.11', '3.12']
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
      - name: Run tests
        run: pytest
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  test-rust:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: Run Rust tests
        run: cargo test
        working-directory: infra/rust
```

## Acceptance Criteria

- [ ] pytest framework configured and working
- [ ] Test directory structure created
- [ ] At least 3 example unit tests written
- [ ] Code coverage reporting configured
- [ ] Coverage report generates successfully
- [ ] Rust testing framework set up
- [ ] CI/CD workflow created and passing
- [ ] Testing documentation written
- [ ] Baseline coverage measured and documented

## Status

**Not Started** 📋

## Dependencies

- Task 002 (Python Dependencies) should be complete
- Python 3.8+ installed
- Rust toolchain installed

## Estimated Effort

**Total:** 1 week (8 hours)
- Test infrastructure setup: 3 hours
- Example tests creation: 2 hours
- CI/CD configuration: 2 hours
- Documentation: 1 hour

## Testing Standards

### Coverage Requirements
- Minimum 80% code coverage for v1.0 release
- All new features must include tests
- Critical security functions require 100% coverage

### Test Types
1. **Unit Tests** - Test individual functions/methods
2. **Integration Tests** - Test API integrations and component interactions
3. **Security Tests** - Test input validation and security features
4. **Performance Tests** - Test response times and resource usage (future)

### Mocking Strategy
- Mock external API calls (OpenAI, Google Maps, etc.)
- Use pytest fixtures for test data
- Create mock servers for integration tests

### Test Naming
- Descriptive test names: `test_function_name_scenario`
- Group related tests in classes
- Use docstrings to explain test purpose

## Related Files

- `pytest.ini` - Pytest configuration (to be created)
- `.coveragerc` - Coverage configuration (to be created)
- `tests/` - Test directory (to be created)
- `.github/workflows/tests.yml` - CI/CD workflow (to be created)
- `docs/TESTING.md` - Testing documentation (to be created)

## Commands

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=scripts --cov-report=html

# Run specific test file
pytest tests/unit/test_route_planning.py

# Run with verbose output
pytest -v

# Run tests matching pattern
pytest -k "test_calculate"

# Run Rust tests
cd infra/rust && cargo test
```

## References

- [Pytest Documentation](https://docs.pytest.org/)
- [pytest-cov Documentation](https://pytest-cov.readthedocs.io/)
- [Rust Testing Guide](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [Testing Best Practices](https://docs.python-guide.org/writing/tests/)

## Success Metrics

- All tests pass in CI/CD
- Coverage report generated
- Baseline coverage established
- Testing documentation complete
- Team understands testing practices

## Notes

Testing is critical for FortiPath's success:
- **Security** - Prevent vulnerabilities through comprehensive testing
- **Reliability** - Ensure features work as expected
- **Maintainability** - Enable safe refactoring
- **Documentation** - Tests serve as living documentation
- **Confidence** - Deploy with confidence knowing code is tested

Start with basic tests and expand coverage incrementally. Focus on testing critical paths first:
1. Report generation
2. Route planning
3. OSINT data processing
4. Security features
5. API integrations

---

**Created:** October 25, 2025  
**Priority:** Critical (Phase 1, Foundation)

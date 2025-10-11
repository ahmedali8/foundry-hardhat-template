# =============================================================================
# FOUNDRY HARDHAT TEMPLATE JUSTFILE
# =============================================================================
# This justfile provides common development tasks for the Foundry + Hardhat project
#
# Usage:
#   just setup          # Complete project setup
#   just test-all       # Run all tests
#   just clean          # Clean build artifacts
#   just --list         # Show all available recipes
# =============================================================================

# =============================================================================
# VARIABLES
# =============================================================================

# Project configuration
node_version := "v24"

# Commands
bun := "bun"
forge := "forge"
nvm := "nvm"

# Directories
scripts_dir := "scripts/foundry"
shell_dir := "shell"
test_dir := "test"

# =============================================================================
# MAIN RECIPES
# =============================================================================

# Default recipe - show help
default:
	@just --list

# Complete project setup
setup: create-env
	@{{bun}} install
	@echo "✅ Setup complete!"

# Run all tests
test-all: test-hardhat test-foundry
	@echo "✅ All tests completed!"

# Clean build artifacts and dependencies
clean:
	@echo "🧹 Cleaning project..."
	@rm -rf node_modules
	@rm -rf cache
	@rm -rf cache_hardhat
	@rm -rf out
	@rm -rf coverage
	@rm -rf .nyc_output
	@rm -rf .coverage
	@rm -rf .hardhat
	@rm -rf artifacts
	@rm -rf types
	@echo "✅ Clean complete!"

# Generate Foundry coverage report
foundry-report:
	@echo "📊 Generating Foundry coverage report..."
	@bash {{shell_dir}}/foundry-coverage.sh

# Deploy contract interactively
deploy-contract contract chain:
	@echo "Interactive contract deployment"
	@if [ -n "{{contract}}" ] && [ -n "{{chain}}" ]; then \
		echo "Deploying contract: {{contract}} on chain: {{chain}}"; \
		{{forge}} script {{scripts_dir}}/{{contract}}.s.sol \
		--broadcast \
		--rpc-url "{{chain}}" \
		--verify \
		-vvvv; \
	else \
		echo "❌ Contract name and chain cannot be empty."; \
		exit 1; \
	fi

# =============================================================================
# NODE.JS VERSION MANAGEMENT
# =============================================================================

# Setup Node.js version using nvm
setup-with-nvm:
	@echo "📦 Using nvm to manage Node.js version..."
	@if {{nvm}} list | grep -q "{{node_version}}"; then \
		echo "✅ Node.js {{node_version}} found, switching to it..."; \
		{{nvm}} use {{node_version}}; \
	else \
		echo "📥 Installing Node.js {{node_version}}..."; \
		{{nvm}} install {{node_version}}; \
		{{nvm}} use {{node_version}}; \
	fi

# =============================================================================
# ENVIRONMENT SETUP
# =============================================================================

# Create .env file from template
create-env:
	@if [ ! -f ./.env ]; then \
		echo "📄 Creating .env file from template..."; \
		cp ./.env.example ./.env; \
		echo "✅ .env file created!"; \
	else \
		echo "ℹ️  .env file already exists"; \
	fi

# =============================================================================
# TESTING
# =============================================================================

# Run Hardhat tests
test-hardhat:
	@echo "🧪 Running Hardhat tests..."
	@{{bun}} run test
	@echo "✅ Hardhat tests completed!"

# Run Foundry tests
test-foundry:
	@echo "🧪 Running Foundry tests..."
	@{{forge}} test
	@echo "✅ Foundry tests completed!"

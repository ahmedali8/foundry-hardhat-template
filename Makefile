# =============================================================================
# FOUNDRY HARDHAT TEMPLATE MAKEFILE
# =============================================================================
# This Makefile provides common development tasks for the Foundry + Hardhat project
#
# Usage:
#   make setup          # Complete project setup
#   make test-all       # Run all tests
#   make clean          # Clean build artifacts
#   make help           # Show this help message
# =============================================================================

# Include .env file and export its environment variables
-include .env

# =============================================================================
# VARIABLES
# =============================================================================

# Project configuration
NODE_VERSION := $(shell cat .nvmrc 2>/dev/null || echo "v22")
PROJECT_NAME := foundry-hardhat-template

# Commands
YARN := yarn
FORGE := forge
NVM := nvm

# Directories
SCRIPTS_DIR := scripts/foundry
SHELL_DIR := shell
TEST_DIR := test

# =============================================================================
# MAIN TARGETS
# =============================================================================

.PHONY: help setup test-all clean deploy-contract

# Default target - show help
.DEFAULT_GOAL := help

# Show help message
help:
	@echo "Available commands:"
	@echo "  setup             - Complete project setup (Node.js, deps, env)"
	@echo "  test-all          - Run all tests (Hardhat + Foundry)"
	@echo "  test-hardhat      - Run Hardhat tests only"
	@echo "  test-foundry      - Run Foundry tests only"
	@echo "  foundry-report    - Generate Foundry coverage report"
	@echo "  clean             - Clean build artifacts and dependencies"
	@echo "  deploy-contract   - Interactive contract deployment"
	@echo "  help              - Show this help message"

# Complete project setup
setup: update-libs create-env install-deps
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
	@bash $(SHELL_DIR)/foundry-coverage.sh

# Deploy contract interactively
deploy-contract:
	@echo "🚀 Interactive contract deployment"
	@read -p "Enter contract name: " contract; \
	read -p "Enter chain: " chain; \
	if [ -n "$$contract" ] && [ -n "$$chain" ]; then \
		echo "Deploying contract: $$contract on chain: $$chain"; \
		$(FORGE) script $(SCRIPTS_DIR)/$$contract.s.sol \
		--broadcast \
		--rpc-url "$$chain" \
		--verify \
		-vvvv; \
	else \
		echo "❌ Contract name and chain cannot be empty."; \
		exit 1; \
	fi

# =============================================================================
# NODE.JS VERSION MANAGEMENT
# =============================================================================

.PHONY: setup-with-nvm

# Setup Node.js version using nvm
setup-with-nvm:
	@echo "📦 Using nvm to manage Node.js version..."
	@if $(NVM) list | grep -q "$(NODE_VERSION)"; then \
		echo "✅ Node.js $(NODE_VERSION) found, switching to it..."; \
		$(NVM) use $(NODE_VERSION); \
	else \
		echo "📥 Installing Node.js $(NODE_VERSION)..."; \
		$(NVM) install $(NODE_VERSION); \
		$(NVM) use $(NODE_VERSION); \
	fi

# =============================================================================
# DEPENDENCY MANAGEMENT
# =============================================================================

.PHONY: update-libs install-deps

# Update Foundry dependencies
update-libs:
	@echo "📚 Updating Foundry dependencies..."
	@git submodule update --init --recursive
	@echo "✅ Foundry dependencies updated!"

# Install Node.js dependencies
install-deps:
	@echo "📦 Installing Node.js dependencies..."
	@$(YARN) install --immutable
	@echo "✅ Node.js dependencies installed!"

# =============================================================================
# ENVIRONMENT SETUP
# =============================================================================

.PHONY: create-env

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

.PHONY: test-hardhat test-foundry

# Run Hardhat tests
test-hardhat:
	@echo "🧪 Running Hardhat tests..."
	@$(YARN) test
	@echo "✅ Hardhat tests completed!"

# Run Foundry tests
test-foundry:
	@echo "🧪 Running Foundry tests..."
	@$(FORGE) test
	@echo "✅ Foundry tests completed!"

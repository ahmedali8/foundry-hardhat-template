# Include .env file and export its environment variables
# (-include to ignore error if it does not exist)
-include .env

# Update dependencies
setup:
	@make update-libs
	@make create-env
	@make install-nodejs-deps

update-libs:
	@git submodule update --init --recursive # equivalent to: forge install

install-nodejs-deps:
	@yarn install --immutable

# Create .env file if it doesn't exist, using .env.example as a template
create-env:
	@[ ! -f ./.env ] && (echo "Copying .env.example to .env" && cp ./.env.example ./.env) || echo ".env exists"

# Test
test-all:
	@yarn test
	@forge test

# Foundry Coverage
foundry-report:
	@bash ./shell/foundry-coverage.sh

# Deploy (use "@" to hide the command from your shell)
deploy-contract:
	@read -p "Enter contract name: " contract; \
	read -p "Enter chain: " chain; \
	if [ -n "$$contract" ] && [ -n "$$chain" ]; then \
		echo "Deploying contract: $$contract on chain: $$chain"; \
		forge script scripts/foundry/$$contract.s.sol \
		--broadcast \
		--rpc-url "$$chain" \
		--verify \
		-vvvv; \
	else \
		echo "Contract name and chain cannot be empty."; \
	fi
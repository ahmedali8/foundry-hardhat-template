# Include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# Update dependencies
setup					:; make update-libs ; make create-env ; make install-deps
update-libs		:; git submodule update --init --recursive
install-deps	:; yarn install --immutable

# Create .env file, if not exists, with .env.example content
create-env		:; [ ! -f ./.env ] && (echo "copying .env.example to .env" && cp ./.env.example ./.env) || echo ".env exists"

# Test
test-all			:; yarn test ; forge test

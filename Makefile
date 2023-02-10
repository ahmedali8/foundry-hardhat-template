# Include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# Update dependencies
setup								:; make update-libs ; make create-env ; make install-nodejs-deps
update-libs					:; git submodule update --init --recursive # equivalent to: forge install
install-nodejs-deps	:; yarn install --immutable

# Create .env file, if not exists, with .env.example content
create-env					:; [ ! -f ./.env ] && (echo "copying .env.example to .env" && cp ./.env.example ./.env) || echo ".env exists"

# Test
test-all						:; yarn test ; forge test

# # use the "@" to hide the command from your shell
# deploy-goerli :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${GOERLI_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

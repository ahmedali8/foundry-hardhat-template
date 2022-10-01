# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# Update dependencies
setup			    :; make update-libs ; make install-deps
update-libs		:; git submodule update --init --recursive
install-deps	:; yarn install --immutable

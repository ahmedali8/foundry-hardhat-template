#!/usr/bin/env bash

# Pre-requisites:
# - foundry (https://getfoundry.sh)
# - lcov (https://github.com/linux-test-project/lcov)

# Strict mode: https://gist.github.com/vncsna/64825d5609c146e80de8b1fd623011ca
set -euo pipefail

# Generates a coverage report with Forge, and it then opens it in the browser
function foundryCoverage() {
  rm -rf coverage
  forge coverage --report lcov
  genhtml --branch-coverage --output "coverage" lcov.info
  open coverage/index.html
}

foundryCoverage
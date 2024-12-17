#!/bin/bash

set -euo pipefail

# Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RESET='\033[0m'

echo -e "${YELLOW}Preparing to remove node_modules...${RESET}"

# Remove node_modules
rm -rf node_modules

echo -e "${GREEN}Successfully cleaned node_modules.${RESET}"

echo -e "${YELLOW}Recreating package-lock.json and reinstalling dependencies...${RESET}"

# Re-Install npm
npm install

echo -e "${GREEN}Successfully reinstalled dependencies and recreated package-lock.json.${RESET}"

echo -e "${GREEN}Clean process completed.${RESET}"

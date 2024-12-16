#!/bin/bash

# set -e: 명령어 실패 시 스크립트 종료
# set -u: 설정되지 않은 변수 사용 시 에러
# set -o pipefail: 파이프라인 명령어 실패 시 에러
set -euo pipefail

# 컬러 출력 설정
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RESET='\033[0m'

# 에러 핸들러
error_handler() {
  echo -e "${RED}Error occurred in script at line $1.${RESET}"
  exit 1
}
trap 'error_handler $LINENO' ERR

echo -e "${YELLOW}Preparing to build...${RESET}"

# Step 1: Clean build directories
if npm run clean; then
  echo -e "${GREEN}Cleaned build directories successfully.${RESET}"
else
  echo -e "${RED}Failed to clean build directories.${RESET}"
  exit 1
fi

# Step 2: Install dependencies
if npm install; then
  echo -e "${GREEN}Dependencies installed successfully.${RESET}"
else
  echo -e "${RED}Failed to install dependencies.${RESET}"
  exit 1
fi

# Step 3: Compile TypeScript
if tsc; then
  echo -e "${GREEN}TypeScript compilation succeeded.${RESET}"
else
  echo -e "${RED}TypeScript compilation failed.${RESET}"
  exit 1
fi

echo -e "${GREEN}Build ready!${RESET}"

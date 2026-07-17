#!/usr/bin/env bash
set -euo pipefail

echo "Deploying DCS website..."

# Always deploy from the directory containing this script
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

rsync -avz \
    --itemize-changes \
    --exclude=".git/" \
    --exclude=".vscode/" \
    --exclude="deploy.sh" \
    --exclude="*.Identifier" \
    --exclude=".DS_Store" \
    --exclude=".env" \
    --exclude="*.bak" \
    --exclude="*.log" \
    --exclude="templates/" \
    --exclude="README.md" \
    -e "ssh -p 1022" \
    ./ \
    csh3422229@ssh.dunmowcomputerservices.com:htdocs/

echo "Deployment complete."
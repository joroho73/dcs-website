#!/bin/bash
set -e

echo "Deploying DCS website..."

rsync -avz \
--exclude ".git" \
--exclude ".vscode" \
--exclude "*.Identifier" \
-e "ssh -p1022" \
./ \
csh3422229@ssh.dunmowcomputerservices.com:htdocs/

echo "Deployment complete."
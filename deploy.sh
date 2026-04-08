#!/bin/sh
git pull
pnpm install
pnpm generate
echo "Static assets generated in .output/public"
bt default

#!/bin/sh
git pull
pnpm install
pnpm build
bt default
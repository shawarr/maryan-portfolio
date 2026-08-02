#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
git pull --ff-only origin main
npm install
npm run build
docker restart mepnahportfolio

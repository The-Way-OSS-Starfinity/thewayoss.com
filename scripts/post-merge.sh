#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push

if [ -z "${GITHUB_PAT}" ]; then
  echo "WARNING: GITHUB_PAT is not set, skipping GitHub sync"
  exit 0
fi

echo "Pushing to GitHub..."

REPO_ROOT="$(git rev-parse --show-toplevel)"
COMMIT_MSG="$(git log -1 --format='%H %s')"
EXPORT_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$EXPORT_DIR"
}
trap cleanup EXIT

git -C "$REPO_ROOT" archive HEAD | tar -x -C "$EXPORT_DIR"

git -C "$EXPORT_DIR" init
git -C "$EXPORT_DIR" config user.email "replit-sync@replit.com"
git -C "$EXPORT_DIR" config user.name "Replit Sync"
git -C "$EXPORT_DIR" add -A
git -C "$EXPORT_DIR" commit -m "Sync from Replit: ${COMMIT_MSG}"
git -C "$EXPORT_DIR" remote add github "https://github.com/The-Way-OSS-Starfinity/thewayoss.com.git"
git -C "$EXPORT_DIR" -c "url.https://x-access-token:${GITHUB_PAT}@github.com/.insteadOf=https://github.com/" push --force github HEAD:main

echo "GitHub sync complete"

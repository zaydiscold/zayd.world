#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$REPO_ROOT"
BACKEND_DIR="$REPO_ROOT/backend"

print_header() {
  printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"
}

ensure_dependencies() {
  local dir="$1"
  if [[ -f "$dir/package.json" && ! -d "$dir/node_modules" ]]; then
    print_header "Installing npm dependencies in $(basename "$dir")"
    (cd "$dir" && npm install)
  fi
}

start_frontend() {
  if [[ ! -f "$FRONTEND_DIR/package.json" ]]; then
    print_header "Frontend package.json not found at $FRONTEND_DIR"
    return 1
  fi

  ensure_dependencies "$FRONTEND_DIR"
  print_header "Starting frontend (Vite dev server)"
  (cd "$FRONTEND_DIR" && npm run dev)
}

start_backend() {
  if [[ -d "$BACKEND_DIR" && -f "$BACKEND_DIR/package.json" ]]; then
    ensure_dependencies "$BACKEND_DIR"
    print_header "Starting backend service"
    (cd "$BACKEND_DIR" && npm run dev)
  else
    print_header "No backend service detected. Skipping backend start."
  fi
}

show_help() {
  cat <<'USAGE'
Usage: scripts/start.sh [options]

Options:
  --frontend    Start only the frontend dev server (default)
  --backend     Start only the backend service (if present)
  --all         Start both frontend and backend
  -h, --help    Show this help message

The script auto-installs npm dependencies when node_modules is missing.
USAGE
}

main() {
  local start_front=false
  local start_back=false

  if [[ $# -eq 0 ]]; then
    start_front=true
  else
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --frontend) start_front=true ;;
        --backend) start_back=true ;;
        --all) start_front=true; start_back=true ;;
        -h|--help) show_help; exit 0 ;;
        *)
          echo "Unknown option: $1"
          show_help
          exit 1
          ;;
      esac
      shift
    done
  fi

  if "$start_back"; then
    start_backend &
    backend_pid=$!
  fi

  if "$start_front"; then
    if "$start_back"; then
      trap 'kill ${backend_pid:-0} 2>/dev/null || true' INT TERM
    fi
    start_frontend
  elif "$start_back"; then
    wait "$backend_pid"
  fi
}

main "$@"

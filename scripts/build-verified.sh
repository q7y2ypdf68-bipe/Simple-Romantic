#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
if command -v timeout >/dev/null; then
  timeout \
    --signal=TERM \
    --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
    "${SITES_BUILD_TIMEOUT:-3m}" \
    "${vinext}" build
else
  echo "GNU timeout unavailable; using the portable watchdog."
  "${vinext}" build &
  build_pid=$!
  (
    sleep "${SITES_BUILD_TIMEOUT:-3m}"
    if kill -0 "${build_pid}" 2>/dev/null; then
      kill -TERM "${build_pid}" 2>/dev/null || true
      sleep "${SITES_BUILD_KILL_AFTER:-10s}"
      kill -KILL "${build_pid}" 2>/dev/null || true
    fi
  ) &
  watchdog_pid=$!
  if wait "${build_pid}"; then
    build_status=0
  else
    build_status=$?
  fi
  kill "${watchdog_pid}" 2>/dev/null || true
  wait "${watchdog_pid}" 2>/dev/null || true
  if [[ "${build_status}" -ne 0 ]]; then
    exit "${build_status}"
  fi
fi

"${script_dir}/validate-artifact.sh"

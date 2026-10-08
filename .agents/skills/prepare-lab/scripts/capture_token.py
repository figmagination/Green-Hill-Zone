#!/usr/bin/env python3
"""Capture a Code Connect token without terminal echo and save it locally."""

import getpass
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import warnings


def save_token(root, token):
    env_path = root / '.env'
    if env_path.is_symlink():
        raise ValueError('Refusing to write a symlinked .env.')
    ignored = subprocess.run(
        ['git', 'check-ignore', '-q', '--', '.env'], cwd=root,
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    tracked = subprocess.run(
        ['git', 'ls-files', '--', '.env'], cwd=root,
        capture_output=True, text=True,
    )
    if ignored.returncode != 0 or tracked.returncode != 0 or tracked.stdout.strip():
        raise ValueError('.env must be ignored and untracked before saving a token.')
    if not token or token == 'your_personal_access_token' or any(c.isspace() for c in token):
        raise ValueError('Token must be nonempty, non-placeholder, and contain no whitespace.')
    # Standard Figma tokens contain no dotenv syntax. Fail rather than corrupting
    # a value whose quoting would need more complex dotenv handling.
    if any(c in token for c in '\x00\'"#\\'):
        raise ValueError('Token contains unsupported dotenv characters.')

    source = env_path if env_path.exists() else root / '.env-example'
    content = source.read_text() if source.exists() else ''
    assignment = re.compile(r'^\s*(?:export\s+)?FIGMA_ACCESS_TOKEN\s*=')
    lines = []
    inserted = False
    for line in content.splitlines(keepends=True):
        if assignment.match(line):
            if not inserted:
                lines.append(f'FIGMA_ACCESS_TOKEN={token}\n')
                inserted = True
        else:
            lines.append(line)
    if not inserted:
        if lines and not lines[-1].endswith('\n'):
            lines[-1] += '\n'
        lines.append(f'FIGMA_ACCESS_TOKEN={token}\n')

    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', dir=root, prefix='.lab-env-', delete=False) as file:
            temporary = Path(file.name)
            os.chmod(temporary, 0o600)
            file.write(''.join(lines))
        os.replace(temporary, env_path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def main():
    root = Path(__file__).resolve().parents[4]
    if not sys.stdin.isatty() or not sys.stderr.isatty():
        print('Hidden token entry requires your own interactive terminal.', file=sys.stderr)
        return 1
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error', getpass.GetPassWarning)
            token = getpass.getpass('Code Connect access token (input hidden): ')
        save_token(root, token)
    except (getpass.GetPassWarning, EOFError, KeyboardInterrupt):
        print('\nToken capture cancelled or hidden input unavailable. Nothing saved.', file=sys.stderr)
        return 1
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 1
    except (OSError, UnicodeError):
        print('Could not save the token to the root .env. No token was displayed.', file=sys.stderr)
        return 1
    print('FIGMA_ACCESS_TOKEN saved to the root .env (owner read/write only).')
    return 0


if __name__ == '__main__':
    sys.exit(main())

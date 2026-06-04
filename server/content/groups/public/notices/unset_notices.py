#!/usr/bin/env python3
"""Set every notice object in the current folder's year JSON files to null."""

import json
from pathlib import Path


def main() -> None:
    for path in sorted(Path.cwd().glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))

        for item in data:
            item["notice"] = None

        path.write_text(
            json.dumps(data, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )

        print(f"unset notices in {path.name}")


if __name__ == "__main__":
    main()

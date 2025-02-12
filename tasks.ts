#!/usr/bin/env -S sh -c '"`dirname $0`/node_modules/.bin/tsx" "$0" "$@"'

import { boot } from "@lumphammer/shared-fvtt-bits/task-core/boot";
import {
  clean,
  copyPacksBack,
  link,
  unlink,
} from "@lumphammer/shared-fvtt-bits/task-core/tasks";
import path from "path";
import { fileURLToPath } from "url";

// This file replaces gulp/grunt/jake/whatever and just provides a place to put
// little build-related chunks of code and way to run them from the command
// line.

const rootPath = path.dirname(fileURLToPath(import.meta.url));

void boot({
  config: {
    rootPath,
    publicPath: "public",
    manifestName: "system.json",
    buildPath: "build",
    packagePath: "build_package",
  },

  commands: [clean, copyPacksBack, link, unlink],
});

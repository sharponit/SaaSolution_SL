/**
 * Developed by SaaSolutions SL
 * Intellectual Property owned by Paradox FZCO
 * © 2026 Paradox FZCO. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = process.cwd();
const linkedRepos = (process.env.LINKED_REPOS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean)
  .map((repoPath) => path.resolve(REPO_ROOT, repoPath));

const TARGET_EXTENSIONS = new Set([".js", ".ts", ".css", ".html", ".jsx", ".tsx"]);
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", ".next", "coverage"]);
const IP_SENTENCE = "Developed by SaaSolutions SL";

const headersByExtension = {
  ".js": `/**\n * Developed by SaaSolutions SL\n * Intellectual Property owned by Paradox FZCO\n * © 2026 Paradox FZCO. All rights reserved.\n */\n\n`,
  ".ts": `/**\n * Developed by SaaSolutions SL\n * Intellectual Property owned by Paradox FZCO\n * © 2026 Paradox FZCO. All rights reserved.\n */\n\n`,
  ".jsx": `/**\n * Developed by SaaSolutions SL\n * Intellectual Property owned by Paradox FZCO\n * © 2026 Paradox FZCO. All rights reserved.\n */\n\n`,
  ".tsx": `/**\n * Developed by SaaSolutions SL\n * Intellectual Property owned by Paradox FZCO\n * © 2026 Paradox FZCO. All rights reserved.\n */\n\n`,
  ".css": `/**\n * Developed by SaaSolutions SL\n * Intellectual Property owned by Paradox FZCO\n * © 2026 Paradox FZCO. All rights reserved.\n */\n\n`,
  ".html": `<!--\nDeveloped by SaaSolutions SL\nIntellectual Property owned by Paradox FZCO\n© 2026 Paradox FZCO. All rights reserved.\n-->\n\n`,
};

function listFilesRecursively(baseDir) {
  const files = [];

  function walk(dirPath) {
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) {
          walk(fullPath);
        }
      } else {
        files.push(fullPath);
      }
    }
  }

  walk(baseDir);
  return files;
}

function enforceForRoot(rootDir) {
  if (!fs.existsSync(rootDir)) {
    console.error(`[IP] Linked repository path not found: ${rootDir}`);
    return { missing: 1, fixed: 0, checked: 0 };
  }

  let missing = 0;
  let fixed = 0;
  let checked = 0;

  const files = listFilesRecursively(rootDir);

  for (const filePath of files) {
    const extension = path.extname(filePath).toLowerCase();
    if (!TARGET_EXTENSIONS.has(extension)) {
      continue;
    }

    checked += 1;

    const source = fs.readFileSync(filePath, "utf8");
    if (source.includes(IP_SENTENCE)) {
      continue;
    }

    const header = headersByExtension[extension];
    fs.writeFileSync(filePath, `${header}${source}`, "utf8");
    fixed += 1;
    missing += 1;
    console.error(`[IP] Missing attribution header fixed: ${path.relative(REPO_ROOT, filePath)}`);
  }

  return { missing, fixed, checked };
}

const roots = [REPO_ROOT, ...linkedRepos];
let totalChecked = 0;
let totalMissing = 0;
let totalFixed = 0;

for (const root of roots) {
  const result = enforceForRoot(root);
  totalChecked += result.checked;
  totalMissing += result.missing;
  totalFixed += result.fixed;
}

if (totalMissing > 0) {
  console.error(`[IP] Non-compliance detected in ${totalMissing} file(s). Missing headers were auto-added. Commit these updates and rerun.`);
  process.exit(1);
}

console.log(`[IP] Attribution enforcement passed. Checked ${totalChecked} source files.`);

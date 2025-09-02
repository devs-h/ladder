const { execSync } = require("child_process");

const app = process.argv[2];
if (!app) {
  console.error("Usage: node scripts/dev.js <app>");
  process.exit(1);
}

execSync(
  `concurrently "bun dev:demo" "npx @tailwindcss/cli -i ./packages/${app}/src/input.css -o ./packages/${app}/src/output.css --watch"`,
  { stdio: "inherit" }
);

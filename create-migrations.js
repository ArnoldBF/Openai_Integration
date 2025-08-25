const { execSync } = require("child_process");
const name = process.env.npm_config_name || "migration";
const timestamp = Date.now();
const fileName = `${name}-${timestamp}`;
execSync(
    `npx ts-node ./node_modules/typeorm/cli.js migration:generate src/db/migrations/${fileName} --dataSource src/config/typeOrm.ts`,
    { stdio: "inherit" }
);

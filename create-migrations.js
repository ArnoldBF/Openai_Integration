const { exec } = require("child_process");

const migrationName = process.argv[2];

if (!migrationName) {
    console.error("Please provide a migration name");
    process.exit(1);
}

const command = `typeorm migration:create ./src/db/migrations/${migrationName}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${stderr}`);
        process.exit(1);
    }
    console.log(stdout);
});

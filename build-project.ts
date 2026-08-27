// Disabling this rule because shell.js doesn't work nicely when imported
// the correct way
/* eslint-disable import-x/no-named-as-default-member */
import shell from 'shelljs';

// Build js files from ts
shell.exec('tsc -p configs/tsconfig.build.json');

// Build styles with postcss
shell.exec('postcss src/styles --dir src/public/styles');

// Copy all the view templates and assets in the public folder
shell.cp('-R', ['src/views', 'src/public'], 'dist/');
shell.cp('src/db/schema.sql', 'dist/db/schema.sql');

// Remove unnecessary files
shell.rm('-f', ['dist/public/js/*.ts', 'dist/public/js/*.json']);

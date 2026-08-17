/* eslint-disable import-x/no-named-as-default-member */
import shell from 'shelljs';
// Copy all the view templates and assets in the public folder
shell.cp('-R', ['src/views', 'src/public'], 'dist/');
shell.cp('src/db/schema.sql', 'dist/db/schema.sql');

// Remove unnecessary files
shell.rm('-f', ['dist/public/js/*.ts', 'dist/public/js/*.json']);

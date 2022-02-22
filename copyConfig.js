const shell = require("shelljs");
shell.cp("-R", "package.json", "dist/");
shell.cp("-R", "public", "dist/");
shell.cp("-R", "src/config/codes.json", "dist/config");
shell.cp("-R", "src/config/codes.json", "dist/Procfile");

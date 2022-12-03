import * as process from "process";

const console = require('console');
const nodeConsole = new console.Console(process.stdout, process.stderr);
export default nodeConsole;
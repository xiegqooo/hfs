echo off
set NODE_ENV=development
rem node-debug app.js
node --debug app
rem node app
rem node --debug-brk=41268 --nolazy app.js 
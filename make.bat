echo off

del /S /Q *.js

cls
echo compile...

node resource-manager.nodejs

tsc main.ts --out main.js --target ES5

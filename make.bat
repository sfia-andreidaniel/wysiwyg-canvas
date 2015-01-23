echo off

del /S /Q *.js

cls
echo compile...
tsc main.ts --out main.js --target ES5

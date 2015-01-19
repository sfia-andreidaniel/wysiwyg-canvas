echo off
erase *.js
erase _assets\*.js
erase HTML\*.js
erase Layout\*.js
erase TNode\*.js
erase TStyle\*.js
erase Character\*.js
cls
echo compile...
tsc main.ts --out main.js --target ES5

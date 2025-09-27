// src/index.js

import path from 'node:path';
import fs from 'node:fs';
import fss from 'node:fs/promises';

const somePath = path.join('some_folder', 'some_file.txt');
console.log(somePath);
// на macOS → 'some_folder/some_file.txt'
// на Windows → 'some_folder\\\\some_file.txt'


// абсолютний шлях до робочої директорії
const pathToWorkDir = path.join(process.cwd());
// додаємо нові частини до шляху
const pathToFile = path.join(pathToWorkDir, "some_folder", "some_file.txt");
console.log(pathToFile);

// macOS → /коренева_папка/some_folder/some_file.txt
// Windows → C:\\\\коренева_папка\\\\some_folder\\\\some_file.txt



const message = "Hello Node";
console.log(message);
console.log("New message");


console.log(path.parse("/home/user/dir/file.txt"));
/*
{
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/



// приклад без кодування
const buffer = fs.readFileSync("file.txt");
console.log(buffer); // <Buffer 48 65 6c 6c 6f ...>


const data = fs.readFileSync("file.txt", "utf8");
console.log("Вміст файлу:", data); // "hfhfhfhfh"



const buffer2 = await fss.readFile("file.txt");
console.log(buffer2); // <Buffer ... >

// з кодуванням
const data2 = await fss.readFile("file.txt", "utf8");
console.log("Вміст файлу:", data2); // "hfhfhfhfh"



// console.log('Before change', process.cwd());
// process.chdir('/Users/malyuta/');
// console.log('After change', process.cwd());



fs.writeFileSync('output.txt', 'Привіт з Node.js!', 'utf8');

await fss.writeFile('output.txt', 'Привіт з Node.js Async!', 'utf8');
console.log('Дані успішно записані у файл.');


await fss.appendFile('output.txt', '\\nЩе один рядок', 'utf8');
console.log('Дані успішно додані у файл.');


// await fss.rename('oldfile.txt', 'newfile.txt');
// console.log('Файл успішно перейменовано.');


// await fss.unlink('file.txt');
// console.log('Файл успішно видалено.');

const buffer3 = await fss.readFile("output.txt");
console.log(buffer3.toString("utf-8")); // Привіт з Node.js Async!




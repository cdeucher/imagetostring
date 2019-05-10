#!/usr/bin/env node
'use strict';  
var program = require( 'commander' );
var pkg = require( './package.json' );  
var fs = require('fs');
var exec = require('child_process').exec;

program
  .version(pkg.version, '-v, --version')

program
  .command('read <img_path> <temporary_folder>')
  .alias('r')
  .description('read img text')
  .action((img_path, temporary_folder) => {
        //console.log("tesseract dompdf_out-1.jpg tmp -l por --psm 6");
    exec("which tesseract", function(error, stdout, stderr) {
        if(stdout != ""){
            if (fs.existsSync(img_path)) { 
                let command = "tesseract "+img_path+" "+temporary_folder+" -l por --psm 6";
                exec(command, function(error, stdout, stderr) {
                    console.log(error, stdout, stderr);
                    exec("cat "+temporary_folder+".txt", function(error, stdout, stderr) {
                        console.log(error, stdout, stderr);
                    });
                });
            }else{
                console.log("File "+img_path+" not found!");
            }    
        }else{
            console.log("Tesseract bin not found! Check out: https://github.com/tesseract-ocr/tesseract ");
        }
    });    
});
    
program.parse(process.argv)
        
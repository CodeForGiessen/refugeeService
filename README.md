# refugeeService

This is the API Server and Author Environment for the refugeeProject
(refugeeApp + refugeeService).

The project uses the MEAN-Stack in combination with the [materialize CSS-Framework](http://www.materializecss.com).

# Contributing

## Installation

Install node.js and npm, download the project and run the following commands:

In the root-directory: `npm install`
Move into /home and run: `bower install`

After finishing you can run the sever with `node index.js`

## Working

While working run `grunt watch` in the root-directory.
This will lint your JavaScript Code and minify all modified css-Files in /home/public/css.

Run `grunt beautify` to make all js-Files more readable.

What is Node?
----------------------------
Chris Taylor
Mon 19 Dec 2016 06:42:32 EST
----------------------------

0.about.me {{{

- Chris Taylor, Software Engineer


































}}}
1.so...node {{{

- Javascript runtime + standard library

- For intense number crunching:  It's aight

- For massively parallel I/O: It's amazing

- Once it's [installed](https://nodejs.org/en/download/package-manager/) use `node` to invoke it

- It's also pretty easy to use

























}}}
2.say-hello {{{

> Chris: Checkout the `say-hello` branch

- Let's write a program:

```
console.log('Hello world');
```

- To run it, first save it in a file, index.js, then run::

```
$ node index
Hello world
```

- Pretty simple, eh?





















}}}
3.console-log-like-printf {{{

> Checkout the `console-log-like-printf` branch

- console.log() works sort of like printf from C.

  - First argument is a pattern 

  - The following arguments are replacements

- Say we wanted to personalize that message?

```
var name = 'Chris';
console.log('Hello, %s' , name);
```

- Pretty handy, eh?














































}}}
4.inputs {{{

- In UNIX, there are a few ways to get inputs into a program.  Three of them
  include:

  - Environment variables

  - Command line arguments

  - Files


- In `node`:

  - Environment variables are stored in the Object, `process.env`

  - Command line arguments are stored in the Array `process.argv`

  - And, we'll get to files in a bit











































}}}
4.overrides {{{

> Checkout the `overrides` branch

- Let's say we wanted to allow users to override the name to better personalize this message as follows:

  - Using the environment variable, `NAME`

```
$ export NAME=Bob
$ node index
Hello, Bob

```

  - Using the command line:


```
$ node index Alice
Hello, Alice
```

- Here's how we'd do it:

```
var name = process.argv[2] || process.env.NAME || 'Chris';
console.log('Hello, %s', name);
```

> Chris, demonstrate it.





























}}}
5.reading-from-disk {{{

> Checkout the `reading-from-disk` branch.

- Node even allows you to read data from the disk

- Let's suppose I wanted to use the contents of the file, `name.txt` as an additional fallback, i.e.:

```
$ echo 'Dave' > name.txt
$ node index
Hello, Dave
```

- Here's how to do it:

```
var fs = require('fs');

var name = process.argv[2] || process.env.NAME;

try {
    name = name || fs.readFileSync('name.txt').toString().trim();
} catch (e) {}

name = name || 'Chris';

console.log('Hello, %s', name);
```

- Questions:

  - What's `require` ?

    A: I'll get to it.
 
  - Hey...that's a bad way to read a file!!!!?!?!!!

    A: I promise to address this.





















}}}
6.other-globals {{{

- You may have noticed that we didn't have to define `console` a few sections ago.

- It's automatically defined

- It's global

- Don't worry:  The list of globals is pretty small.  Handy globals include:

  - __filename: The full pathname of the current source file.

  - __dirname: The full pathname of the directory containing the current source file.

  - console: Contains handy methods like `console.log`.

- require.














































}}}
7.require {{{

- require is extremely handy

- Allows you to __pull in an object from somewhere else__.

- Somewhere else?

- Yes.  Somewhere else:

  - require('./a/relative/path/to/a/file.js')

    Pulls in the object exported in the referenced file.

  - require('foobar')

    Performs a search:

    - If there's a `node_modules/foobar` directory

      - If there's a `node_modules/foobar/package.json` file

	- If there's a `main` field in `package.json`, load the object exported
	  in the file named by `main`

      - If we haven't loaded a file yet, load `node_modules/foobar/index.js` 

  - Continue the search for `../node_modules/foobar`,
    `../../node_modules/foobar`, ... until you reach the root directory.

  - Try to pull in the builtin module, `foobar`.

  - Throw an exception.

- Now that's complicated.  But it comes in handy.

















}}}
8.modules {{{

- Remember the `require('./a/relative/path/to/a/file.js')` example?

- This loads an object exported by the CommonJS module, `file.js`.

- Making a CommonJS module isn't terribly complicated:  It just involves:

  - Throwing some Javascript into a file.

  - Making sure to assign something interesting to the the global,
    `module.exports`

  - This exported object will be returned by
    `require('./path/to/that/file.js')`.

- Let's say we wanted to hide the details on how to discover the user's name.

- One way is to:

  - Create a function describing the process.

  - Chucking it into a module.

  - Exporting the function.

> Checkout the branch, `modules`

> Describe what's going on here












































}}}
9.btw-packages {{{

- A package is a special kinda module: A module, plus.

- Still CommonJS

- Must never reach up and out of its directory (i.e. `require('../../foo.js')` is a no-no)

- Flanked with metadata, in the form of a `package.json` file





















































}}}
10.package-dot-json {{{

- All node programs are actually packages

- But you're allowed to leave out the package.json unless you really need it

- Let's add one:

```
{
    "name": "hello",
    "version": "1.0.0",
    "repository": "git@github.com:cttttt/what-is-node.git",
    "author": "Chris Taylor <ctaylorr@not-so-fast.com>"
}
``` 















































}}}




































}}}





vim:foldmethod=marker


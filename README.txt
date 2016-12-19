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

- Although you're allowed to omit `package.json` for simple programs, no
  package is complete without one.

- Let's add one for now:

```
{
    "name": "hello",
    "version": "1.0.0",
    "repository": "git@github.com:cttttt/what-is-node.git",
    "author": "Chris Taylor <ctaylorr@not-so-fast.com>"
}
``` 

- That's it.  It's not terribly useful right now, but will be.  I promise.

- Another handy way to create one is to run the command:

```
npm init
```

...and answer the questions even if it means hitting ENTER at all prompts.

















































}}}
11.http {{{

- You may have heard of something called the internet

- A pretty popular protocol applications use on the internet is HTTP

- Node just happens to be great for implementing HTTP servers

- A handy one is sitting in the `http` module

- Here's the simplest one you'll ever see:

```
var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(30303);
```

> Chris: Explain this

- Let's turn that simple program into an http server that responds with the
  configured name

> Checkout the `http` branch

> Chris: Explain this

  - `http` is a built-in module: Has all of the machinery for a fully
    functioning http server

  - `http.createServer()` creates a new server

  - Once the server is asked to `.listen()`, any connections that come in will
    result in a call to the function we provided with details on the incoming
    request, as well as a handle through which we can respond





















}}}
12.incoming-requests {{{

- Here's an example of a raw HTTP request:

```
$ telnet localhost 30303
GET / HTTP/1.1
host: localhost:30303
user-agent: curl/7.49.1
accept: text/plain

HTTP/1.1 200 OK
content-type: text/plain
...
...
Hello, Chris

$ curl -v localhost:30303
...
...
Hello, Chris
```

- That `req` argument to our callback will have fields for each piece of
  information from the request.

- This includes:

    - req.method: GET

    - req.url: /

    - req.httpVersion: 1.1

    - req.headers: { 
	host: 'localhost:30303',
	'user-agent': 'curl/7.49.1',
	'accept': 'text/plain' 
      }





































}}}
13.simple-api {{{

- One use for an HTTP server is to provide an accessible API

- Let's make the simplest API encapsulating a name:

-- GET /api/name - Retrieves the saved name, or the default, Chris
-- POST /api/name?name=NAME - Stores a new name
-- DELETE /api/name - Removes any names saved using the HTTP API

-- GET / - Retrieves a friendly message based on the saved name

> Chris: Checkout the `simple-api` branch

> Chris: Explain and demo it

- There are a few...issues in this code.  Over the next few sections, we'll try
  to set it straight.



















































}}}
14.blocking-is-evil {{{

- Remember when we read the name out of the file in `derive-name.js`?

- This is actually evil

- Remember operating systems class?

    - In UNIX, by default, if a process performs a read from disk, it's
      actually asking the kernel to fill a buffer with data from the file on
      disk

    - Until the buffer is filled, THE PROCESS IS GIVEN NO TIME ON THE CPU

    - An alternative is to give the kernel a buffer and ask it do the work in
      the background, and to use various methods to determine when the work is
      done.

- Node makes it easy to do I/O in this second way:

```
var fs = require('fs');

fs.readFile('name.txt', function (err, data) {
  console.log('The file contained %s', data);
});
```

> Chris: Checkout on the branch, `blocking-is-evil`



































}}}
15.this-servers-complicated {{{

- This is all there is to making API servers in Node

- From here on in, it's up to us to find better ways to organize code

- A noble goal (when it comes to organization) is to separate concerns within our application:

  - Configuration

  - Routing

  - Controller code
 
  - Model


















































}}}
16.connect {{{

- There are a tonne of modules that help with this, but a pretty handy one
  is `connect`.

- With `connect`, routing is handled using a Chain of Responsibility.

- The links in the chain are called `middleware`.

> Chris: Checkout the `connect`, remove `node_modules` and run it.

- Uh-oh.  'connect' isn't found dude.

- Aside: npm

  - Node's package manager.

  - Remember the funky search logic for require?

  - npm downloads packages and puts them into `node_modules/`

  - It detects dependencies by looking into the `dependencies` field of
    `package.json`

  - A package requires other packages?  They're put into just the right
    place in `node_modules/`

- To install `connect`, simply run:

```
npm install --save connect
```

> Chris: Give it a shot

- As far as code cleanup is concerned, this has helped get rid of one of
  the monster switch statements










































}}}
17.express {{{

- Yet another handy module is called `express`

- It builds on `connect`

  - Adds advanced routing

  - Allows sub-applications

  - Provides several convenience methods and fields to `req` and `res`

- But more on that next time!





























}}}







































vim:foldmethod=marker


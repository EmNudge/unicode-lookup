# Unicode Lookup

This is a web app to quickly look up unicode names from hex codes.

I've recently been using unicode lookup tools a lot during research and I found some to be lacking, buggy, or slow.
It turns out that it's super easy to use web workers and a massive text file to make the entire application static and super quick.
That's what this is.

A quick, easy, static unicode lookup web app.
![tool](https://i.imgur.com/isD2LpT.png)
Try it at https://unicode-lookup.netlify.app/

# How To Use
Currently there is "Simple Search" and "Category Matcher". Soon there will be "Simple Search" and "Advanced Search".

For *Simple Search*, it accepts:
- character to find
- text to match against description
- regex to match against *character* (in form `/regex/`)
- codepoint of character
  - decimal form
  - hexidecimal form (in form `0x[somenumber]` e.g. `0xfab23`)
  - binary form (in form `0b[somenumber]` e.g. `0b1101110`)

### Roadmap
- [x] add advanced search
- [ ] remove "results number" and move into a streamable output
- [ ] fix codepoints skipping massive ranges or control codes
- [ ] make ugly UI/UX a bit prettier
- [ ] add more data to results
  - [ ] block (e.g. `'Basic Latin'`)
  - [ ] plane (e.g. `'Basic Multilingual Plane'`)
  - [x] encoding (UTF-8, UTF-16, and UTF-32)
  - [x] matching Unicode properties
    - [tool for that here](https://svelte.dev/repl/853ca8e17da544308cbb5c081ad56a6d?version=3.31.2)
# Unicode Lookup

This is a web app to quickly look up unicode names from hex codes.

I've recently been using unicode lookup tools a lot during research and I found some to be lacking, buggy, or slow.
It turns out that it's super easy to use web workers and a massive text file to make the entire application static and super quick.
That's what this is.

A quick, easy, static unicode lookup web app.

![tool](https://i.imgur.com/XkplKrW.png)

Try it at https://unicode-lookup.netlify.app/

# How To Use
Currently there is "Simple Search" and "Advanced Search".

For *Simple Search*, it accepts:
- character to find
- text to match against description
- regex to match against *character* (in form `/regex/flags`)
- codepoint of character
  - decimal form
  - hexidecimal form (in form `0x[somenumber]` e.g. `0xfab23`)
  - binary form (in form `0b[somenumber]` e.g. `0b1101110`)

*Advanced Search* is a bit more... advanced.
It allows us to create a series of filters, called "rules". These rules can be of 2 types:

- **Require**
  - requires codepoint to match any of N filters.
  - can chain multiple with the `OR` button.
- **Exclude**
  - requires codepoint to NOT match a specific filter.

The following example excludes characters in the BMP and then requires the character to either have the unicode property XID_Start or the property White_Space:

![advanced search](https://i.imgur.com/cUE1Zp9.png)

*Simple Search* will execute while we type. *Advanced Search* will only execute once pressing the `Search` button. 
*Simple Search* will also execute if we press enter focusing the box.

### Settings
- Codepoint Format
  - Show codepoints in Hexidecimal, Octal, or Decimal.
  - Default is Hexidecimal
- Title Casing 
  - Change titles to UPPERCASE, TitleCase, or lowercase
  - Default is UPPERCASE
- Results Amount
  - Change the amount of results shown before searching is stopped.
  - Default is 50.
  - This may be obsolete in the future. 
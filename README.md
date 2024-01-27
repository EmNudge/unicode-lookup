# Unicode Lookup

This is a web app to quickly look up unicode names from hex codes.

I've recently been using unicode lookup tools a lot during research and I found some to be lacking, buggy, or slow.
It turns out that it's super easy to use web workers and a massive text file to make the entire application static and super quick.
That's what this is.

A quick, easy, static unicode lookup web app.
Try it at http://unicode.emnudge.dev/

![tool](https://github.com/EmNudge/unicode-lookup/assets/24513691/3d0a3cff-7bc9-465c-9a6f-c6d86d434634)

# How To Use
Right click the info icon to copy it to your clipboard.

Left click a row to bring up the info view.

Currently there is "Simple Search" and "Advanced Search".

For *Simple Search*, it accepts:
- character to find (simply type in a single character)
- text to match against description
- regex to match against *character* (in form `/regex/flags`)
- glob pattern match against *names* (in form `latin * a`)
- codepoint of character
  - decimal form
  - hexidecimal form (in form `0x[number]` or `U+[number]` e.g. `0xfab23` or `U+fab23`)
  - binary form (in form `0b[number]` e.g. `0b1101110`)
- codepoint range (in form `num1-num2`, where `num1` and `num2` are in dec, hex, or bin form)

*Advanced Search* is a bit more... advanced.
It allows us to create a series of filters, called "rules". These rules can be of 2 types:

- **Require**
  - requires codepoint to match any of N filters.
  - can chain multiple with the `OR` button.
- **Exclude**
  - requires codepoint to NOT match a specific filter.

The following example excludes characters in the BMP and then requires the character to either have the unicode property XID_Start or the property White_Space:

![advanced search](https://user-images.githubusercontent.com/24513691/106977581-9d479900-6728-11eb-8e76-b152552ea71d.jpg)

*Simple Search* will execute while we type. *Advanced Search* will only execute once pressing the `Search` button. 
*Simple Search* will also execute if we press enter focusing the box.

### Known Bugs/Limitations
- Safari does not support any regex unicode property where `Script` equals one of `"Chorasmian"`, `"Dives_Akuru"`, `"Elymaic"`, `"Khitan_Small_Script"`, `"Nandinagari"`, `"Nyiakeng_Puachue_Hmong"`, `"Wancho"`, or `"Yezidi"`.
  - e.g. `/\p{Script=Wancho}/u` will throw an error on Safari and is therefore not supported on that browser.
- Anything typed into simple search before all unicode data has loaded will not be searched, even after the unicode data has loaded.
  - Pressing enter while in the text box will perform a search after loading is complete.

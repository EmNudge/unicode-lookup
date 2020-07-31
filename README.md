# Unicode Lookup

This is a web app to quickly look up unicode names from hex codes.

I've recently been using unicode lookup tools a lot during research and I found some to be lacking, buggy, or slow.
It turns out that it's super easy to use web workers and a massive text file to make the entire application static and super quick.
That's what this is.

A quick, easy, static unicode lookup web app.

Try it at https://unicode-lookup.netlify.app/

### Roadmap
- [x] Make site a PWA
- [x] Add support for Regex, dec/hex numbers
- [x] Allow linking to a specific search
- [ ] Add settings section to specify regex and number searches
- [ ] In addition to using [DerivedNames.txt](https://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedName.txt) as the main file to parse from, use [UnicodeData.txt](https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt) to grab more information for specified characters.
- [ ] Allow users to save characters for later.
- [ ] Add character combination and normalization tools
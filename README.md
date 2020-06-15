# Unicode Lookup

This is a web app to quickly look up unicode names from hex codes.

I've recently been using unicode lookup tools a lot during research and I found some to be lacking, buggy, or slow.
It turns out that it's super easy to use web workers and a massive text file to make the entire application static and super quick.
That's what this is.

A quick, easy, static unicode lookup web app.

### To Do
I found [DerivedNames.txt](https://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedName.txt) to be the easiest way to derive names from code points. There may be more efficient ways (as it's a massive text file), but this is what is being used.

There is also [UnicodeData.txt](https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt) which includes more information about many characters - such as their category and their uppercase/lowercase variants. 

If people request this in the future, I may end up adding functionality to scrape that file to add more info to the resulting queried characters.
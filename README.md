# About
The purpose of this repository is to host localization files for [Moyase](https://jacobalbano.com/moyase/).

## Contributing
If you would like to translate Moyase into a new language, I would be very grateful to accept a pull request to this repository.  
Such a request must include the following:
- One json file (use `en-US.json` as a template)
  - The filename must be of the format that would be returned by [`Navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) in a standards-compliant browser.
  - See the **[File Structure](#file-structure)** section below for further details
- `readme.md` must be amended to include your name and a link to your github profile in the [contributors](#contributors) section

By contributing, you agree to release your changes under the terms set forth in `LICENSE`.  

Please only contribute if you have a high level of competence with both English and the target language.  
**Contributions which employ Google Translate, Deepl, or any other machine translation service, are NOT welcome.**

## File Structure
- `displayName`
  - The string that will be displayed to the user in the language selection window.
  - This should be the *native* name, not the English name; e.g. instead of "Japanese" use 日本語; instead of "German" use "Deutsch"
  - If the file represents a regional variant, make sure to indicate this; e.g. "English (US)"
- `locale`
  - The name of the locale file, without its extension; e.g. "en-US" for the file `en-US.json`
  - As mentioned above, this string should be in the format defined [here](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)
- `unitFormat`
  - A regular expression that will be used to capture and validate user-defined unit format strings
  - This expression should return *named* capture groups corresponding to the categories for *cardinal numbers* [CLDR Language Plural Rules](https://unicode-org.github.io/cldr-staging/charts/37/supplemental/language_plural_rules.html) repository
  - For example, in English, when defining a new goal a user may enter the string "book/books", which will be used to format numbers in the statistics section. Since English has two cardinal rules ('one' and 'other'), the expression must capture and return both. On the other hand, since Japanese has no concept of plurals in this way, only one group ('other') should be captured.
  - The application makes no assumptions about the way this will be presented to the user, so please use whatever will be most intuitive to a native speaker.
- `dateFnsLocaleKey`
  - Moyase uses [date-fns](https://date-fns.org/) to handle date formatting. This property should be a string that identifies the locale in its localization module.
  - Please see [this file](https://github.com/date-fns/date-fns/blob/master/src/locale/index.js) for a list of supported locales and their identifiers.
- `strings`
  - All text in the application is sourced from this object.
  - Changing any property names will cause translation to fail and the offending key itself will be rendered instead.
  - Token substitution can be performed in one of three ways:
    - Plain substitution, denoted by a number between two curly brackets, e.g. `{0}`
    - Formatted substitution, denoted by a colon and format identifier after the token number, e.g. `{0:DATE_SHORT}`. Format strings can be customized (see below) but new format strings cannot be created in the localization file.
    - Flag-driven substitution, denoted by a colon *and* exclamation point after the token number, e.g. `{0:!UNIT_CARDINAL}`. These special flags indicate that some logic should be run on the provided value to determine the final result. New flags cannot be created in the localization file.
  - The available format flags are as follows:
    - `DATE_PREFER_NO_YEAR`
      - If the supplied date is in the same year as the current date, use the `DATE_SHORT` format string
      - Otherwise, use the `DATE_SHORT_WITH_YEAR` format string
    - `DATE_CARDINAL`
      - Pluralize the supplied number of days
    - `UNIT_CARDINAL`
      - Pluralize the supplied number of units
      - If the current goal has a unit format string, that pattern will be used
      - Otherwise, the values supplied in the `UNIT` property of the `plurals` object (see below) will be used
    
- `format`
  - The strings in this section should be formed according to `date-fns` [formatting rules](https://date-fns.org/v2.23.0/docs/format)
- `plurals`
  - The built-in rules `DAY` and `UNIT` will be used to supply values for the CLDR identifiers as mentioned above.
  - These objects must have one property for each plural category defined by the target language)

### Contributors
- English (US) : [@jacobalbano](https://github.com/jacobalbano)
- Japanese: [@jacobalbano](https://github.com/jacobalbano)


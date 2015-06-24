## stylint - the stylus linter.

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rossPatton/stylint?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Code Climate](https://codeclimate.com/github/rossPatton/stylint/badges/gpa.svg)](https://codeclimate.com/github/rossPatton/stylint) [![Test Coverage](https://codeclimate.com/github/rossPatton/stylint/badges/coverage.svg)](https://codeclimate.com/github/rossPatton/stylint)

[![NPM](https://nodei.co/npm/stylint.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/stylint/)

[patch notes](https://github.com/rossPatton/stylint/blob/master/patch-notes.md)

[known issues](https://github.com/rossPatton/stylint/issues)

If you have any problems with the linter just create a ticket there and I will respond.

Same thing if you have any feature requests.

I will gladly accept pull requests if you want to do the work yourself.

you can also ping me [here](https://gitter.im/rossPatton/stylint)


## CLI
`-h` or `--help`    Display list of commands

`-w` or `--watch`   Watch file or directory and run lint on change

`-c` or `--config`  Pass in location of custom config file

`-v` or `--version` Display current version


## Example cli Usage:
`stylint` Run stylint on cwd

`stylint path/to/filename.styl` Run stylint on a file

`stylint path/to/dir --watch` Watch dir, run stylint on file change

`stylint --help` Get list of commands

`stylint --version` Get version number

`stylint --config path/to/config/.configrc` Run stylint with custom config settings

`stylint styl/ --watch -c path/to/config/.configrc` Watch dir, use custom config


## Non ClI Usage
I'll be the first to admit that the syntax is a bit weird, but it works just fine. 
```javascript
const stylint = require('stylint')('path/to/stylus/', {
    brackets: 'always',
    namingConvention: 'BEM',
    semicolons: 'always'
}).create();
```


## Gulp
You can use the CLI with [gulp-shell](https://github.com/sun-zheng-an/gulp-shell) like below:
```javascript
gulp.task('stylint', shell.task([
    'stylint path/to/styl/ -c .stylintrc'
]));
```

Or just use [gulp-stylint](https://github.com/danielhusar/gulp-stylint)
```javascript
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
    return gulp.src('src/*.styl')
        .pipe(stylint())
});
```

## Brunch
Using [stylint-brunch](https://www.npmjs.com/package/stylint-brunch)
```
config =
  plugins:
    stylint:
      options:
        bitwise: true
        curly: true
```


## As Part of Your Workflow
Stylint integrations with both Sublime Text 3 and Atom.io are available.

[Atom linter-stylint](https://atom.io/packages/linter-stylint)

[SublimeLinter-contrib-stylint](https://packagecontrol.io/packages/SublimeLinter-contrib-stylint)


## Why Write This Tool?
Stylus is my CSS pre-processor of choice and the lack of a decent linter (or really, any linter) was an annoying pain point. So I thought I'd try my hand at writing what I thought my ideal linter would look like.


## Why Use This Tool?
To catch little mistakes (duplication of rules for instance) and to enforce a code style guide. This is particularly important with Stylus, which is unopinionated when it comes to syntax. Like Stylus itself, this linter opts for flexibility over rigidity.


## Options
The following is a list of all options available to stylint.
```
{
	blocks: false,
	brackets: 'never',
	colons: 'always',
	colors: 'always',
	commaSpace: 'always',
	commentSpace: 'always',
	cssLiteral: 'never',
	depthLimit: false,
	duplicates: true,
	efficient: 'always',
	extendPref: false,
	globalDupe: false,
	indentPref: false,
	leadingZero: 'never',
	maxErrors: false,
	maxWarnings: false,
	mixed: false,
	namingConvention: false,
	namingConventionStrict: false,
	none: 'never',
	noImportant: true,
	parenSpace: false,
	placeholders: 'always',
	prefixVarsWithDollar: 'always',
	quotePref: false,
	semicolons: 'never',
	sortOrder: 'alphabetical',
	stackedProperties: 'never',
	trailingWhitespace: 'never',
	universal: false,
	valid: true,
	zeroUnits: 'never',
	zIndexNormalize: false
};
```

#### Custom Configuration
By default, Stylint attempts to use the .stylintrc file in your working directory. If not, the above is what it falls back to.

You can also use the `-c` or `--config` flags to pass in the location of your custom `.stylintrc` config file if it resides somewhere else.

If requiring Stylint ( as opposed to using it via the cli ), the 2nd param is the config object.


#### Severity
Stylint has 2 levels of output, Warnings and Errors. All Stylint rules optionally take an object, allowing you to set it to be an Error. Combined with the maxWarnings and maxErrors properties, you can be very flexible about say, code style but strict on things like code duplication.

Example:
```javascript
{
    brackets: {
        expect: 'never',
        error: true
    },
    colons: {
        expect: 'always',
        error: true
    }
}
```


### warning toggle ( inline comment: @stylint off || @stylint on )
Disable linting for a particular block of code by placing `@stylint off` in a line comment. Re-enable by placing `@stylint on` in a line comment further down. Stylint will not test any lines until turned back on. Use this to suppress warnings on a case-by-case basis. By default the linter will check every line except for @css blocks or places where certain rules have exceptions.

For example, let's say you want to enforce `namingConvention: "lowercase_underscore"`, but you're also styling elements from the Bootstrap framework. You can use the `@stylint off` toggle to prevent warnings in places where you're referencing Bootstrap classes.

Example:
```stylus
.button_block {
	background: silver;
	padding: 4px;
}
// @stylint off
.button_block .btn-default {
	background-color: green;
	color: white;
}
// @stylint on
```


### ignore toggle ( inline comment: @stylint ignore )
A toggle that works like the block comment, but just for one line. Useful for cases where you want to include fallback css for browser support.

Example:
```stylus
.button-zoom
	cursor pointer // @stylint ignore
	cursor zoom-in
// @stylint on
```


### blocks ( default: false, 'always' || 'never' || false )
When 'always' expect the `@block` keyword when defining block variables.
When 'never', expect no `@block` keyword when defining block variables.
When false, do not check either way.

Example if 'always': prefer `my-block = @block ` over `my-block = `

Example if 'never': prefer `my-block = ` over `my-block = @block `


### brackets ( default: 'never', 'always' || 'never' || false )
When 'always', expect {} when declaring a selector.
When 'never', expect no brackets when declaring a selector.

Example if 'always': prefer `.some-class-name {` over `.some-class-name`

Example if 'never': prefer `.some-class-name ` over `.some-class-name {`


### colons ( default: 'always', 'always' || 'never' || false )
When 'always', expect : when declaring a property.
When 'never', expect no : when declaring a property.

Example if 'always': prefer `margin: 0` over `margin 0`

Example if 'never: prefer `margin 0` over `margin: 0`


### colors ( default: 'always' || false )
When 'always', enforce variables when defining hex values

Example if true: prefer `color $red` over `color #f00`


### commaSpace ( default: 'always', 'always' || 'never' || false )
Enforce or disallow spaces after commas.

Example if always: prefer `rgba(0, 0, 0, .18)` over `rgba(0,0,0,.18)`

Example if never: prefer `rgba(0,0,0,.18)` over `rgba(0, 0, 0, .18)`


### commentSpace ( default: 'always', 'always' || 'never' || false )
Enforce or disallow spaces after line comments

Example if always: prefer `// comment` over `//comment`

Example if never: prefer `//comment` over `// comment`


### cssLiteral ( default: 'never', 'never' || false )
By default Stylint ignores `@css` blocks. If set to true however, it will throw a warning if `@css` is used.

Example if 'never': `@css` will throw a warning


### depthLimit ( default: false, number or false )
Set the max selector depth. If set to 4, max selector depth will be 4 indents. Pseudo selectors like `&:first-child` or `&:hover` won't count towards the limit.

Set to false if you don't want to check for this.


### duplicates ( default: true, true || false )
Checks if selector or property duplicated unnecessarily. By default, only checks on a file-by-file basis, but if `globalDupes: true` is set, then it will also check for duplicates globally (for root values only).

Example if true: the following will throw a warning:
```stylus
.test
	margin 0
	margin 5px
```


### efficient ( default: 'always', 'always' || 'never' || false )
Check for places where properties can be written more efficiently.

Example if always: prefer `margin 0` over `margin 0 0`

Example if never: prefer `margin 0 0` over `margin 0`


### extendPref ( default: false, '@extend' || '@extends' || false )
Pass in either `@extend` or `@extends` and then enforce that. Both are valid in Stylus. It doesn't really matter which one you use. I prefer `@extends` myself.

Example if set to `@extends`: prefer `@extends $some-var` over `@extend $some-var`

Example if set to `@extend`: prefer `@extend $some-var` over `@extend $some-var`


### globalDupe ( default: false, true || false )
Works in conjunction with duplicates. Does nothing on its own. If false, duplicates will check for dupes within individual files only. If true, duplicates will check for dupes across all files.

Example if true: the following will throw a warning
```stylus
>>> file1.styl
.test
	margin 0

>>> file2.styl
.test
	margin 5px
```


### indentSpaces ( default: 4, number or false )
This works in conjunction with depthLimit. If you indent with spaces this is the number of spaces you indent with. If you use hard tabs, set this value to false.

By default this value is false, so if you indent with spaces you'll need to manually set this value in a custom `.stylintrc` file.


### leadingZero ( default: 'never', 'always' || 'never' || false )
Enforce or disallow unnecessary leading zeroes on decimal points.

Example if always: prefer `rgba( 0, 0, 0, 0.5 )` over `rgba( 0, 0, 0, .5 )`

Example if never: prefer `rgba( 0, 0, 0, .5 )` over `rgba( 0, 0, 0, 0.5 )`


### maxErrors ( default: false, number || false )
Set 'max' number of Warnings.


### maxWarnings ( default: false, number || false )
Set 'max' number of Errors.


### mixed ( default: false, boolean, relies on indentPref )
Returns true if mixed spaces and tabs are found. If a number is passed to indentPref, it assumes soft tabs (ie, spaces), and if false is passed to indentPref it assumes hard tabs.

If soft tabs, outputs warning/error if hard tabs used. If hard tabs, outputs warning/error if unnecessary extra spaces found.

Example if indentPref: 4 and mixed: true: prefer `\s\s\s\smargin\s0` over `\tmargin\s0`

Example if indentPref: 2 and mixed: true: prefer `\s\smargin\s0` over `\tmargin\s0`

Example if indentPref: false and mixed: true: prefer `\tmargin\s0` over `\s\s\s\smargin\s0`


### namingConvention ( default: false, false | 'lowercase-dash' | 'lowercase_underscore' | 'camelCase' | 'BEM' )
Enforce a particular naming convention when declaring classes, ids, and variables. Throws a warning if you don't follow the convention.

Example if set to `'lowercase-dash'`: prefer `$var-name` over `$var_name` or `$varName`

Example if set to `'lowercase_underscore'`: prefer `$var_name` over `$var-name` or `$varName`

Example if set to `'camelCase'`: prefer `$varName` over `$var_name` or `$var-name`

Example if set to `'BEM'`: prefer `$var__like--this` over `$var_name` or `$varName`


### namingConventionStrict ( default: false, boolean )
By default, namingConvention only looks at variable names. If namingConventionStrict is set to true, namingConvention will also look at class and id names.

If you have a lot of 3rd party css you can't change you might want to leave this off.


### none ( default: 'never'. options: 'always' || never' || false  )
If 'always' check for places where `none` used instead of `0`.
If 'never' check for places where `0` could be used instead of `none`.

Example if 'always': prefer `border none` over `border 0`

Example if 'never': prefer `outline 0` over `outline none`


### parenSpace ( default: false, 'always' || 'never' || false )
Enforce or disallow use of extra spaces inside parens.

Example if always: prefer `my-mixin( $myParam )` over `my-mixin($myParam)`

Example if never: prefer `my-mixin($myParam)` over `my-mixin( $myParam )`


### placeholder ( default: 'always', 'always' || 'never' || false )
Enforce extending placeholder vars when using `@extend(s)`

Example if always: prefer `@extends $placeholder` over `$extends .some-class`

Example if never: prefer `@extends .some-class` over `$extends $placeholder`


### prefixVarsWithDollar ( default: 'always', 'always' || 'never' || false )
Enforce use of `$` when defining a variable. In Stylus using a `$` when defining a variable is optional, but is a good idea if you want to prevent ambiguity. Not including the `$` sets up situations where you wonder: "Is this a variable or a value?" For instance: `padding $default` is easier to understand than `padding default`.

Yes, `default` isn't an acceptable value for `padding`, but at first glance you might not catch that since it just looks like a value. And now if you try to set `cursor default`, it's not going to behave the way you expect. All this pain and heartache could've been avoided if you just used a `$`.

Example if always: prefer `$my-var = 0` over `my-var = 0`

Example if never: prefer `my-var = 0` over `$my-var = 0`


### quotePref ( default: false,  'single' || 'double' || false )
Enforce consistent quotation style.

Example if `'single'`: prefer `$var = 'some string'` over `$var = "some string"`

Example if `'double'`: prefer `$var = "some string"` over `$var = 'some string'`


### stackedProperties ( default: 'never', 'never' || false )
No one-liners. Enforce putting properties on new lines.

Example if `never`: prefer

```stylus
.className
	padding 0
```

over

`.className { padding 0 }`


### semicolons ( default: 'never', 'always' || 'never' || false )
Enforce or disallow semicolons

Example if always: prefer `margin 0;` over `margin 0`

Example if never: prefer `margin 0` over `margin 0;`


### sortOrder ( default: false, 'alphabetical' || 'grouped' || [Array] || false )
Enforce a particular sort order when declaring properties. Throws a warning if you don't follow the order. If set to false, allow any order.

Example if `'alphabetical'`:

prefer this:
```stylus
.some-class
	display block
	float left
	position absolute
	right 10px
	top 0
```

over this:
```stylus
.some-class
	position absolute
	top 0
	right 10px
	display block
	float left
```

Example if `'grouped'` ([based on predefined grouped ordering](src/data/ordering.json#L2)):

prefer this:
```stylus
.some-class
	position absolute
	top 0
	right 10px
	display block
	float left
```

over this:
```stylus
.some-class
	display block
	float left
	position absolute
	right 10px
	top 0
```

Example if `[ 'margin', 'padding', 'float', 'position' ]`:

prefer this:
```stylus
.some-class
	margin 0
	padding 0
	float left
	position absolute
	right 10px
	top 0
	display block
```

over this:
```stylus
.some-class
	display block
	float left
	position absolute
	right 10px
	top 0
	margin 0
	padding 0
```

When set to `'grouped'` or `{Array}` throws a warning if properties that are not defined in the ordering array are not after those that should be ordered.


### universal ( default: 'never', 'never' || false )
Looks for instances of the inefficient * selector. Lots of resets use this, for good reason (resetting box model), but past that you really don't need this selector, and you should avoid it if possible.

Example if never, disallow the following:
```stylus
div *
    margin 0
```


### valid ( default: true, true || false )
Check that a property is valid CSS or HTML.

Example if true: `marg 0` will throw a warning, prefer `margin 0`

Example if true: `divv` will throw a warning, prefer `div`


### whitespace ( default: true, true || false )
Disallows trailing whitespace


### zeroUnits ( default: 'never', 'always' || 'never' || false )
Looks for instances of `0px`. You don't need the px. Checks all units, not just px.

Example if always: prefer `margin-right 0px` over `margin-right 0`

Example if never: prefer `margin-right 0` over `margin-right 0em`


### zIndexNormalize ( default: false, number or false )
Enforce some (very) basic z-index sanity. Any number passed in will be used as the base for your z-index values. Throws an error if your value is not normalized.

Example if set to 5: prefer `z-index 10` over `z-index 9`
Example if set to 10: prefer `z-index 20` over `z-index 15`
Example if set to 50: prefer `z-index 100` over `z-index 75`

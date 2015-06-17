# Meteor Bootstrap Generator

A Twitter Bootstrap to Meteor package generator. The generator will export
modular packages from Twitter Bootstrap and save them as Meteor packages.

The main use cases of this generator are:

1. A very fast and easy way to generate a modular, Meteor-centric Twitter Bootstrap packages for your app
2. A stable means of mainting Meteor-centric Twitter Bootstrap packages on Atmosphere.


## Installation

	npm install -g dschnare/meteor-bootstrap-gen


## Quick Start

	meteor create myapp
	mbg packages
	meteor add bootstrap-navs bootstrap-tab

Add the following to your html...

	<div>
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#" data-toggle="tab">Home</a></li>
      <li role="presentation"><a href="#" data-toggle="tab">Profile</a></li>
      <li role="presentation"><a href="#" data-toggle="tab">Messages</a></li>
    </ul>
  </div>

Then run your app...

	meteor run


## Usage

	mbg
		[--twb-packages=PATH_TO_JSON]
		[--package=PACKAGES]
		[--pkg-prefix=METEOR_PKG_PREFIX]
		[--meteor-user=METEOR_USERNAME]
		{destination directory}

**--twb-packages**

The `--twb-packages` option accepts an optional path to the JSON data file holding the definition for each Twitter Bootstrap package. If not specified then the default JSON data file will be used. Specify your own Twitter Bootstrap packages JSON data file to have more control over the output.


**--package**

The `--package` option accepts a comma separated list of Twitter Bootstrap pacakge names.
If any package names are specified then only those packages will be exported as Meteor packages.
Otherwise all Twitter Bootstrap packages will be exported as Meteor packages.

Example:

	mbg --package=base,mixins,variables,buttons,navs,tab packages

**--pkg-prefix**

The `--pkg-prefix` option, if not specified, defaults to `bootstrap-`.

**--meteor--user**

The `--meteor-user` is optional, but if specifified then the resulting `package.js` will contain the Meteor username as part of the package name.

**NOTE: If using mbg to maintain existing Meteor Twitter Bootstrap packages then the same `--meteor-user` and `--pkg-prefix` options must be used when regenerating the Meteor pacakges, otherwise the Meteor package depedendencies can't be resolved.**

Example:

	mbg --package=variables --meteor-user=dschnare packages

The above example results in the following Meteor pacakges being generated:

	packages/bootstrap-variables

The `package.js` file will look like this:

	Package.describe({
		name: 'dschnare:bootstrap-variables',
	  summary: 'Bootstrap: variables',
	  version: '3.3.4'
	});

	Package.onUse(function (api) {
		api.versionsFrom('1.1.0.2');
		api.use(['jquery', 'less'], 'client');
		api.addFiles('less/variables.less', 'client');
	});


## Twitter Bootstrap Packages JSON Data File

The format of the JSON data file is expected to be of the following format:

	{
		"bootstrap-package-name": {
			"files": [
				"list of files to copy to Meteor package and add to api.use()"
			],
			"imports": {
				"any valid Less statements, typically @imports"
			},
			"copy": [
				"globs of files to copy to Meteor package"
			],
			"deps": [
				"list of bootstrap package names that this package depends on"
			]
		}
	}

The `files` property contains a list of files that will be copied
to the Meteor package and added to an `api.use(file, 'client')` call.
All file paths are relative to the Twitter Bootstrap Node package directory.

The `imports` property contains a list of statements to prepend to each Less file
listed in the `files` property. Typically these statements are `@imports`, but can be any valid Less.
Each statement is rendered as a Mustache template with the following context:

	{ destPkgPrefix, dest }

Where the `destPkgPrefix` is the value passed in from `--pkg-prefix` or `bootstrap-`;
`dest` is the basename of the destination directory where all Meteor packages are saved to.

The `copy` property contains a list of glob patterns of files that will be copied
to the Meteor package. All globs are relative to the Twitter Bootstrap Node package directory
unless prefixed with `cwd:`. If a glob pattern is prefixed with `cwd:` then the glob will be
relative to the current working directory.

If files a glob pattern matches contains `.mustache` it will be rendered
as a Mustache template with the following context:

	{ meteorUser, pkg, bootstrap, destPkgPrefix }

Where `meteorUser` is the value passed in from `--meteor-user`;
`pkg` is the Twitter Bootstrap package loaded from the Twitter Bootstrap pacakges JSON data file;
`bootstrap` is the loaded Twitter Bootstrap `package.json` file (typically used for
version info) and `destPkgPrefix` is the value passed in from `--pkg-prefix`.

*The pkg Twitter Bootstrap package object will have a `name` property added for easy reference to the package's name. This name is the Twitter Bootstrap name and not the Meteor package name.*

*Note that Mustache templates that are copied will be saved directly to the Meteor package using their
basename and the `.mustache` token removed from the file name.*

Example:

	"copy": [
		"cwd:templates/meteor/package.mustache.js"
	]

This file will be renderd using Mustache and saved as `package.js` to the Meteor package.


## Note About Duplicate CSS

Although great care was taken to mitigate duplicate CSS there may be circumstances where small pieces
of CSS get duplicated, such as the `.clearfix` utility class.


## The Twitter Bootstrap Packages

Here is a list of all the Twitter Bootstrap packages supported by this generator.

**NOTE: These packages are only available when using the default Twitter Bootstrap packages JSON data file.**

- full
- theme
- variables
- mixins
- base
- affix
- alerts
- badges
- breadcrumbs
- button-groups
- buttons
- carousel
- close
- code
- collapse
- component-animations
- dropdowns
- forms
- glyphicons
- grid
- input-groups
- jumbotron
- labels
- list-group
- media
- modals
- navs
- navbar
- pager
- pagination
- panels
- popovers
- print
- progress-bars
- responsive-embed
- scrollspy
- tab
- tables
- thumbnails
- tooltip
- transition
- type
- wells
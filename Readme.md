# Meteor Bootstrap Generator

A Twitter Bootstrap to Meteor package generator. The generator will export
modular packages from Twitter Bootstrap and save them as Meteor packages.

The main use cases of this generator are:

1. A very fast and easy way to generate a modular, Meteor-centric Twitter Bootstrap packages for your app
2. A stable means of mainting Meteor-centric Twitter Bootstrap packages on Atmosphere.


# Installation

	npm install -g dschnare/meteor-bootstrap-gen


# Quick Start

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


# Usage

	mbg
		[--package=PACKAGES]
		[--pkg-prefix=METEOR_PKG_PREFIX]
		[--meteor-user=METEOR_USERNAME]
		{destination directory}

The CLI accepts an optional comma separated list of Twitter Bootstrap pacakge names.
If any package names are specified then only those packages will be exported as Meteor packages.
Otherwise all Twitter Bootstrap packages will be exported as Meteor packages.

Example:

	mbg --package=base,mixins,variables,buttons,navs,tab packages


The `--pkg-prefix` option, if not specified, defaults to `bootstrap-`.
The `--meteor-user` is optional, but if specifified then the resulting `package.js` will contain the Meteor username as part of the package name.

**NOTE: If useing mbg to maintain existing Meteor Twitter Bootstrap packages then the same `--meteor-user` and `--pkg-prefix` options must be used when regenerating the Meteor pacakges, otherwise the Meteor package depedendencies can't be resolved.**

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


# Note About Duplicate CSS

Although great care was taken to mitigate duplicate CSS there may be circumstances where small pieces
of CSS get duplicated, such as the `.clearfix` utility class.


# The Twitter Bootstrap Packages

Here is a list of all the Twitter Bootstrap packages supported by this generator.

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
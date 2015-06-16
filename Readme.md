# Meteor Bootstrap Generator

A Twitter Bootstrap to Meteor package generator. The generator will export
modular packages from Twitter Bootstrap and save them as Meteor packages.


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

	mbg [--package=PACKAGES] {destination directory}

The CLI accepts an optional comma separated list of Twitter Bootstrap pacakge names.
If any package names are specified then only those packages will be exported as Metero packages.
Otherwise all Twitter Bootstrap packages will be exported as Meteor packages.

Example:

	mbg --package=base,mixins,variables,buttons,navs,tab packages


# Note About Duplicate CSS

Although great care was taken to mitigate duplicate CSS there may be circumstances where small pieces
of CSS get duplicated, such as the `.clearfix` utility class.
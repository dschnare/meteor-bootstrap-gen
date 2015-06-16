Package.describe({
	name: '{{destPkgPrefix}}{{pkg.name}}',
  summary: 'Bootstrap: {{pkg.name}}',
  version: '{{bootstrap.version}}'
});

Package.onUse(function (api) {
	api.use(['jquery', 'less'], 'client');
	{{#pkg.deps}}
	api.use('{{destPkgPrefix}}{{.}}', 'client');
	{{/pkg.deps}}
	{{#pkg.files}}
	api.addFiles('{{{.}}}', 'client');
	{{/pkg.files}}
});
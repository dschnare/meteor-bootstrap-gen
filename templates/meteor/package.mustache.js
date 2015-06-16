Package.describe({
  name: '{{#meteorUser}}{{.}}:{{/meteorUser}}{{destPkgPrefix}}{{pkg.name}}',
  summary: 'Bootstrap: {{pkg.name}}',
  version: '{{bootstrap.version}}'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use(['jquery', 'less'], 'client');
  {{#pkg.deps}}
  api.use('{{#meteorUser}}{{.}}:{{/meteorUser}}{{destPkgPrefix}}{{.}}@{{bootstrap.version}}', 'client');
  {{/pkg.deps}}
  {{#pkg.files}}
  api.addFiles('{{{.}}}', 'client');
  {{/pkg.files}}
});
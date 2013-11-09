module.exports = function(grunt) {
  'use strict';
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    sampleDir: "samples",
    libDir: "src",
    destDir: "dest",
    testDir: "test",
    docDir: "doc",

    watch: {
      sample: {
        files: ['<%= sampleDir %>/*.jsx', '<%= libDir %>/*.jsx'],
        tasks: ['jsx:build']
      },
      test: {
        files: ['<%= testDir %>/*.jsx', '<%= libDir %>'],
        tasks: ['jsx:test']
      }
    },

    jsx: {
      sample: {
        src: ['<%= sampleDir %>/*.jsx'],
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        dest: '<%= sampleDir %>/',
        executable: 'node'
      },

      commonjs: {
        src: ['src/*.jsx'],
        output_rule: {
            regexp: /src\/(.+)\.jsx/,
            replace: 'dest\/$1.common.js'
        },
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        minify: true,
        release: true,
        linker: 'commonjs-lib'
      },

      amd: {
        src: ['src/*.jsx'],
        output_rule: {
            regexp: /src\/(.+)\.jsx/,
            replace: 'dest\/$1.amd.js'
        },
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        minify: true,
        release: true,
        linker: 'amd-lib'
      },

      closure: {
        src: ['src/*.jsx'],
        output_rule: {
            regexp: /src\/(.+)\.jsx/,
            replace: 'dest\/$1.closure.js'
        },
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        minify: true,
        release: true,
        linker: 'closure-lib'
      },

      global: {
        src: ['src/*.jsx'],
        output_rule: {
            regexp: /src\/(.+)\.jsx/,
            replace: 'dest\/$1.global.js'
        },
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        minify: true,
        release: true,
        linker: 'export-global'
      },

      standard: {
        src: ['src/*.jsx'],
        output_rule: {
            regexp: /src\/(.+)\.jsx/,
            replace: 'dest\/$1.js'
        },
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        release: true,
        minify: true
      },

      test: {
        src: ['<%= testDir %>/*.jsx'],
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        test: true
      },

      doc: {
        src: ['<%= libDir %>/*.jsx'],
        add_search_path: ['<%= libDir %>', 'node_modules/*/src'],
        dest: '<%= docDir %>',
        mode: 'doc'
      }
    }
  });

  for (var key in pkg.devDependencies) {
    if (/grunt-/.test(key)) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.registerTask('default', ['jsx:test']);
  grunt.registerTask('build', [
    'jsx:commonjs',
    'jsx:amd',
    'jsx:closure',
    'jsx:standard',
    'jsx:global'
  ]);
  grunt.registerTask('test', ['jsx:test']);
  grunt.registerTask('doc', ['jsx:doc']);
};
// vim: set expandtab tabstop=2 shiftwidth=2:

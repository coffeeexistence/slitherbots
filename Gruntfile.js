'use strict';

var sourceFiles = [
  'src/setup.js',
  'src/components/**/*.js',
  'src/slitherbots.js'
];

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      files: sourceFiles,
      options: {esversion: 6}
    },

    "rollup": {
      "options": {
        "format": "iife",
        "plugins": [
          require("rollup-plugin-babel")({
            "presets": ["es2015-rollup"]
          })
        ]
      },
      "dist": {
        "files": {
          "./dist/bundle.es6": ["./src/slitherbots.js"]
        }
      }
    },

    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'dist/app.js': './dist/bundle.es6'
            }
        }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-rollup');

  grunt.registerTask('default', ['jshint', 'rollup', 'babel']);

};

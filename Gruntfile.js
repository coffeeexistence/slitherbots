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
    }
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'dist/app.js': 'src/slitherbots.js'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'babel']);

};

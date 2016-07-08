require('load-grunt-tasks')(grunt);

var sourceFiles = [
  'src/components/**/*.js',
  'src/slitherbots.js'
];

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: sourceFiles,
      options: {}
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'babel']);

};

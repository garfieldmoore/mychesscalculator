module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jshint'])
  grunt.initConfig({
    jshint: {
      all: ['js/Controllers/*.js', 'js/*.js', 'js/services/*.js', '!js/bootstrap*.js', '!js/npm.js', '!js/angular**.js'],
      options: {
      browser: true,
      jasmine:true,
      node:true,
      globals: {
        jQuery: true,
        $:true,
        app:true,
        angular:true,
        console:true,
        normalDistributionDifferenceLookup:true,
        normalDistributionExpectedResultValues:true,

      },
    },
  },

    watch: {
      files: ['js/**/*.js','js/Controllers/*.js',  'js/services/*.js', './*.html','.jshintrc'],
      tasks: ['jshint'],
      options: {
        reload: true,
        livereload: true,
      }

    }
  });
};

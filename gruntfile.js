module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['jshint']);
  grunt.initConfig({

    jasmine: {
      src: 'js/**/*.js',
      vendor: ['js/angular.min.js'],
      options: {
        specs: 'tests/**/*Specs.js',
        vendor: ['js/angular.min.js'],
        // template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: '/assets',
            paths: {
              // 'jquery': 'libs/jquery/dist/jquery'
            }
          }
        },
      },
    },

    jshint: {
      all: ['js/Controllers/*.js', 'js/*.js', 'js/services/*.js', '!js/bootstrap*.js', '!js/npm.js', '!js/angular**.js'],
      options: {
        browser: true,
        jasmine: true,
        node: true,
        globals: {
          jQuery: true,
          $: true,
          app: true,
          angular: true,
          console: true,
          normalDistributionDifferenceLookup: true,
          normalDistributionExpectedResultValues: true,

        },
      },
    },

    watch: {
      files: ['js/**/*.js', 'js/Controllers/*.js', 'js/services/*.js', './*.html', '.jshintrc'],
      tasks: ['jshint'],
      options: {
        reload: true,
        livereload: true,
      }

    }
  });
};

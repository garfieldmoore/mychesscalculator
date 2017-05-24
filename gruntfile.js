module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
                grunt.loadNpmTasks('grunt-contrib-watch');
                grunt.registerTask('default',['jshint'])
    grunt.initConfig({
        jshint: {
            all: ['js/**/*.js', '!js/jquery*.js', '!angular*.js', '!angular-ui-bootstrap/','!bootstrap-*-dist/']
        },

                                watch:{
                                                files: ['js/*.js','./*.html','js/*.html'],
                                                tasks: ['jshint'],
                                                options:{
                                                                reload:true,
                                                                livereload:true,
                                                }

                                }
                });
};

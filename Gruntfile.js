(function(){
    'use strict';
    module.exports = function(grunt) {
        grunt.initConfig({
            paths: {
                js: ['*.js', 'models/**/*.js', 'api/**/*.js', 'home/**/*.js'],
                css: ['home/public/css/*.css', '!home/public/css/*.min.css']
            },

            jshint: {
                src: '<%= paths.js %>'
            },

            jsbeautifier: {
                beautify: {
                    src: '<%= paths.js %>'
                },
                check: {
                    src: '<%= paths.js %>',
                    options: {
                        mode: 'VERIFY_ONLY'
                    }
                }
            },

            cssmin: {
                target: {
                    files: [{
                        expand: true,
                        cwd: 'home/public/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'home/public/css',
                        ext: '.min.css'
                    }]
                }
            },

            watch: {
                js: {
                    files: '<%= paths.js %>',
                    tasks: ['jshint']
                },
                css: {
                    files: '<%= paths.css %>',
                    tasks: ['cssmin']
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jsbeautifier');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        // grunt.loadNpmTasks('grunt-contrib-uglify');

        grunt.registerTask('default', ['jshint', 'jsbeautifier:check']);
        grunt.registerTask('beautify', ['jsbeautifier:beautify']);
    };
})();
module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		clean: [
    'assets/js/min',
    'index.html'
		],
		copy: {
			main: {
				 files: [
          { src: 'dev.html',
            dest: 'index.html'
          }
				 ]
			},
		},
		ngmin: {
      dist: {
        files: [
        {
          expand: true,
          cwd: '.tmp/concat/assets/js/min/',
          src: 'app.js',
          dest: '.tmp/concat/assets/js/min/'
        }
        ]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
              'assets/js/min/{,*/}*.js'
          ]
        }
      }
    },
		'useminPrepare': {
			html: [
      'index.html'
			],
			options: {
      	dest: './'
    	}
		},
		usemin: {
			html: [
      'index.html'
			]
		}
	});
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
	grunt.registerTask('default',
		[
		'clean',
		'copy',
		'useminPrepare',
		'concat',
		'ngmin',
		'uglify',
		'rev',
		'usemin'
		]);

};
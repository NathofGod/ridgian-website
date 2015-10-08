module.exports = function (grunt) {
    require('jit-grunt')(grunt);
	require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
			src: {
				js: [
					'app/js/app.js',
                    'app/js/components/**/*.js',
					'app/js/services/**/*.js',
					'app/js/controllers/**/*.js']
			},
			dest: {
				js: 'public/js/app.js',
				jsMin: 'public/js/app.min.js'
			}
		},
        concat: {
			options: {
				separator: '/* link */\n',
				sourceMap: true
			},
			dist: {
				src: '<%= paths.src.js %>',
				dest: '<%= paths.dest.js %>',
			},
		},
        uglify: {
			options: {
				compress: true,
				mangle: true,
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapIn: '<%= paths.dest.js %>.map',

			},
			target: {
				src: '<%= paths.src.js %>',
				dest: '<%= paths.dest.jsMin %>'
			}
		},
		ts: {
            default: {
                src: ["app/ts/*.ts"],
                outDir: "app/js/generated/"
            }
        },
        watch: {
			js: {
				files: 'app/js/**/*.js',
                tasks: ['dojs'],
                options: {
                    livereload: true
                }
			},
			ts: {
                files: 'app/ts/*.ts',
                tasks: ['ts'],
                options: {
                    livereload: true
                }
            },
            styles: {
				files: ['app/**/*.less'],
				tasks: ['newer:less'],
				options: {
					nospawn: true,
					livereload: true
				}
			},
			markup: {
                files: ['views/**/*.hbs', 'public/views/**/*.html'],
                options: {
                    livereload: true,
                }

            }
        },
        bower: {
            dev: {
                dest: 'public/',
                js_dest: 'public/js',
                css_dest: 'public/styles'
            }
        },
        bower_concat: {
            all: {
                dest: 'public/js/libs.js',
                cssDest: 'public/css/libs.css',
                bowerOptions: {
                    relative: false
                },
                dependencies: {
                    'angular': 'jquery',
                    'angular-route': 'angular',
					'angular-cookies': 'angular',
                    'classie': 'jquery',
                    'basket': 'jquery',
					'malihu-custom-scrollbar-plugin': 'jquery'
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "public/css/app.css": "app/less/app.less" // destination file and source file
                }
            }
        },
		concurrent: {
			dev: {
				tasks: ['nodemon', 'node-inspector', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		'node-inspector': {
			dev: {}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					env: {
						PORT: '8080'
					},
					ignore: ['node_modules/**', 'app/js/**', 'public/js/**'],
					// omit this property if you aren't serving HTML files and  
					// don't want to open a browser tab on start 
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});

						// opens browser on initial server start 
						nodemon.on('config:update', function () {
							// Delay before server listens on port 
							setTimeout(function () {
								require('open')('http://localhost:8080');
							}, 1000);
						});

						// refreshes browser when server reboots 
						nodemon.on('restart', function () {
							// Delay before server listens on port 
							setTimeout(function () {
								require('fs').writeFileSync('.rebooted', 'rebooted');
							}, 1000);
						});
					}
				}
			}
		},
		metalsmith: {
			staticSiteExample: {
				options: {
					metadata: {
						title: "Staitc Site",
						description: "My Static Site"
					},
					source: "src",
					destination: "public/build",
					plugins: {
						'metalsmith-register-helpers': {
							directory: "./server/handlebars/helpers"
						},
						'metalsmith-clean': true,
						'contentful-metalsmith': {
							accessToken: "9c58df927542109a651d0193a7843ba16877d698b11896935565f3e336e8c20f"
						},
						'metalsmith-markdown': {},
						'metalsmith-templates': {
							engine: "handlebars",
							directory: "templates"
						},
						'metalsmith-data-markdown': {
							removeAttributeAfterwards: true
						}
					}
				},
				src: 'src',
				dest: 'public/build'
			}
		}
	});



    grunt.registerTask('server', [], function () {
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-bower-concat');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-node-inspector');
		grunt.loadNpmTasks('grunt-nodemon');
		grunt.loadNpmTasks('grunt-newer');
		grunt.task.run(
			'build',
			'concurrent'
			);
	});




	grunt.registerTask('metalsmith', [], function () {
		grunt.loadNpmTasks('grunt-metalsmith');
		grunt.task.run(
			'metalsmith'
			);
	});

	grunt.registerTask('build', [], function () {
		grunt.loadNpmTasks('grunt-bower-concat');
		grunt.loadNpmTasks('grunt-newer');
		grunt.task.run(
			'dojs',
			'bower_concat',
			'newer:less'
			);
	});

	grunt.registerTask('dojs', [], function () {
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-newer');
		grunt.task.run(
			'newer:concat',
			'newer:uglify'
			);
	});


};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['sass/*.scss'],
        tasks: ['compass:dist'],
        options: {
          spawn: false,
        },
      },
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          config: 'config.rb',
          // sassDir: 'sass',
          // cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },

    //COPY ALL PHP FILES OVER TO DIST FOLDER
    copy: {
      
      mainfiles: {
        src: '*.php',
        dest: 'dist/',
      },
      subfiles: {
        files: [
          {src: ['partials/*'], dest: 'dist/'},
          {src: ['inc_data/*'], dest: 'dist/'},
          {src: ['inc/**'], dest: 'dist/'}
        ]
      },
      images: {
        src: 'img/**',
        dest: 'dist/'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};


//setup 
//use grunt-modernizr
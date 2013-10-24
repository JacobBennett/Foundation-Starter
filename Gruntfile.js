module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {

      scripts: {
        files: ['scss/*.scss'],
        tasks: ['compass:dist'],
        options: {
          spawn: false,
        },
      }

      // publicDirectory: {
      //   files: ["public/**/*"]
      //   tasks
      // }
    },

    //GET THE COMPASS GOING
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'scss',
          cssDir: 'css'
        }
      }
    },

    //COPY FILES TO DIST
    copy: {
      
      main: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ["**"],
            dest: "dist/"
          },
          {
            expand: true,
            cwd: 'partials/',
            src: ["**"],
            dest: "dist/partials"
          }
        ]
      },

      images: {
        files: [
          {
            expand: true,
            cwd: 'opt-imgs/',
            src: ["**"],
            dest: "dist/img"
          }
        ]
      }

    },

    //MAKE DAT JS UGLI!!
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    clean: {
      all: {
        src: 'dist/*',
        dot: true //clean hidden files as well
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  grunt.registerTask("default", ["uglify"]);

  grunt.registerTask("nuke", ["clean:all", "copy:main", "copy:images"]);

};


//setup 
//use grunt-modernizr
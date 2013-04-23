module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine_node: {
      specNameMatcher: '*\\.spec',
      projectRoot: './specs'
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test',['jasmine_node']);
};
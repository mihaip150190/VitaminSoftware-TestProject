module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-webpack");
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");
    grunt.initConfig({
        webpack: {
			options: webpackConfig,
			"build-dev": {
				devtool: "sourcemap",
				debug: true
			}
		},
		watch: {
			"app": {
				files: ["src/*.js", "www/*.html"],
				tasks: ["webpack:build-dev"],
				options: {
					spawn: false,
				}
			}
		}
    });

    grunt.registerTask("default", ["webpack:build-dev", "watch:app"]);
};
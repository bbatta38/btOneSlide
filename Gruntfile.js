module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//uglify 설정
		uglify: {
			options: {
				banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */ ' //파일의 맨처음 붙는 banner 설정
			},
			build: {
				src: 'js/jquery.btOneSlide.js', //uglify할 대상 설정
				dest: 'js/jquery.btOneSlide.min.js' //uglify 결과 파일 설정
			}
		}
		//,
		////concat 설정
		//concat:{
		//	basic: {
		//		src: ['public/js/common/util.js', 'public/js/app.js', 'public/js/lib/*.js', 'public/js/ctrl/*.js'], //concat 타겟 설정(앞에서부터 순서대로 합쳐진다.)
		//		dest: 'public/build/result.js' //concat 결과 파일
		//	}
		//}
	});

 // Load the plugin that provides the "uglify", "concat" tasks.
 grunt.loadNpmTasks('grunt-contrib-uglify');
 //grunt.loadNpmTasks('grunt-contrib-concat');

 // Default task(s).
 grunt.registerTask('default', ['uglify']); //grunt 명령어로 실행할 작업

 };
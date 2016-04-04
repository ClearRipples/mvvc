
module.exports = function(grunt) {
    // 自动加载 grunt 任务
    require('load-grunt-tasks')(grunt);

    // 统计 grunt 任务耗时
    require('time-grunt')(grunt);

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'src/libs/YtInGUI/img/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: 'src/libs/YtInGUI/_dist/img' // 优化后的图片保存位置
                }]
            }
        },
        //解析CSS文件并且添加浏览器前缀到CSS规则
        autoprefixer: {
            options: {
                diff: false,
                browsers: ['last 2 versions','ios 5','android 2.3']
            },

            // prefix all files
            multiple_files: {
                expand: true,
                src: ['src/libs/YtInGUI/css/*.css', 'src/libs/YtInGUI/css/**/*.css']
            }
        },
        //编译 sass，生成 css
        sass: {
            dist: {
                expand: true,
                flatten: true,
                cwd: 'src/libs/YtInGUI/sass',
                src: ['**/*.scss'],
                dest: 'src/libs/YtInGUI/css/',
                ext: '.css',
                "sourcemap=none": ''
            }            
        },
        //压缩样式文件
        cssmin: {
            dist: {
                expand: true,
                cwd: 'src/libs/YtInGUI/css/',
                src: ['**/*.css'],
                dest: 'src/libs/YtInGUI/_dist/css/'
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/libs/YtInGUI/js',
                    src: '**/*.js',
                    dest: 'src/libs/YtInGUI/_dist/js/',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/libs/YtInGUI/libs/',
                    src: '**/*.js',
                    dest: 'src/libs/YtInGUI/_dist/libs/'
                }]
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/libs/YtInGUI/js/**/*.js', '!src/libs/YtInGUI/js/YtInG.js'],
            options: {
                // 允许多行字符拼接, 在 *.tpl 中常用
                "multistr": true,
                // 允许使用类似这种表达式 $.isFunction( fn ) && fn();
                "expr": true,
                // 允许使用类似这种函数  new Function("obj","return 123")
                "evil": true
            }
        },
        concat: {
            zepto: {
                src: [
                    'src/libs/YtInGUI/libs/zepto/zepto.js',
                    'src/libs/YtInGUI/libs/zepto/event.js',
                    'src/libs/YtInGUI/libs/zepto/touch.js', 
                    'src/libs/YtInGUI/libs/zepto/ajax.js',
                    'src/libs/YtInGUI/libs/zepto/form.js'
                ],
                dest: 'src/libs/YtInGUI/libs/zepto.min.js'
            },
            js: {
                src: [
                    'src/libs/YtInGUI/js/core/core.js',
                    'src/libs/YtInGUI/js/component/*.js'
                ],
                dest: 'src/libs/YtInGUI/js/YtInG.js'
            }
        },
        copy: {
            //将版本文件进行同时复制保持版本的差异性
            font:{
                expand: true,
                src: 'src/libs/YtInGUI/font/**/*',
                dest: 'src/libs/YtInGUI/_dist/font'
            },
            //最新的 debug 源文件
            cssdebug:{
                expand: true,
                cwd: 'src/libs/YtInGUI/css',
                src: '*.css',
                dest: 'src/libs/YtInGUI/_dist/css-debug'
            },
            //js 的源文件
            jsdebug:{
                expand: true,
                cwd: 'src/libs/YtInGUI/js',
                src: '**/*',
                dest: 'src/libs/YtInGUI/_dist/js-debug'
            },
            //各版本的 demo
            demo:{
                expand: true,
                src: 'src/libs/YtInGUI/demo/*.html',
                dest: 'src/libs/YtInGUI/<%=pkg.webget_version%>'
            },

            //sass 的源文件进行保留，方便后续追踪
            sass: {
                expand: true,
                src: 'src/libs/YtInGUI/sass/**/*',
                dest: 'src/libs/YtInGUI/<%=pkg.webget_version%>'
            },
            //当前编译得到最新文件
            dist: {
                expand: true,
                cwd: 'src/libs/YtInGUI/_dist',
                src: ['font/**/*','img/*.{png,jpg,jpeg}',
                'css/YtInG.css',
                'js/YtInG.js','libs/zepto.min.js'],
                dest: 'src/libs/YtInGUI/dist'
            },
            //将最新编译得到的文本拷贝到版本文件
            main: {
                expand: true,
                cwd: 'src/libs/YtInGUI/_dist',
                src: '**/*',
                dest: 'src/libs/YtInGUI/<%=pkg.webget_version%>'
            },
            //发布到项目最终的widgets文件夹
            widgets:{
                expand: true,
                cwd: 'src/libs/YtInGUI/dist',
                src: '**/*',
                dest: 'widgets/YtInGUI'
            },
            //发布到项目需要用到的widgets文件夹
            src_widgets:{
                expand: true,
                cwd: 'src/libs/YtInGUI/dist',
                src: '**/*',
                dest: 'src/widgets/YtInGUI'
            }
        },
        includereplace: {
            html: {
                expand: true,
                cwd: 'src/libs/YtInGUI/demo/src',
                src: ['*.html'],
                dest: 'src/libs/YtInGUI/demo/'
            }
        },
        jsdoc: {
            doc: {
                src: ['src/libs/YtInGUI/js/**/*.js'],
                options: {
                    destination: 'src/libs/YtInGUI/jsdoc'
                }
            }
        },
        watch: {
            demo: {
                files: [
                    'src/libs/YtInGUI/demo/**/*.html'
                ],
                tasks: ['includereplace']
            },
            css: {
                files: [
                    'src/libs/YtInGUI/sass/**/*.scss'
                ],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['src/libs/YtInGUI/js/**/*.js', '!src/libs/YtInGUI/js/YtInG.js'],
                tasks: ['concat:js', 'jsdoc']
            }
        }
    });
    grunt.registerTask('copystatic',['copy:font','copy:cssdebug','copy:sass','copy:demo','copy:dist','copy:main', 'copy:src_widgets','copy:widgets']);
    // 默认任务
    grunt.registerTask('wt', [
        'sass',
        'autoprefixer',
        'cssmin',
        'imagemin',
        'concat:zepto',
        'concat:js',
        'copy:jsdebug',
        'uglify',
        'copystatic',
        'includereplace',
        //'watch'
    ]);
    // 根据 docs 的代码片段生成 demo 到 demo/*.html
    grunt.registerTask('demo', ['includereplace']);
};
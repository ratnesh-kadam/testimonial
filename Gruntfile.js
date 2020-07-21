module.exports = function( grunt ) {
    'use strict';

    const pkg = grunt.file.readJSON( 'package.json' );

    grunt.initConfig( {

        pkg,

        clean: {
            build: [ 'build/' ],
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            '**/*',
                            '!**/*.css.map',
                            '!**/*.js.map',
                            '!node_modules/**',
                            '!**/node_modules/**',
                            '!config/**',
                            '!.gitignore',
                            '!editor.asset.php',
                            '!Gruntfile.js',
                            '!gulpfile.js',
                            '!index.css',
                            '!index-rtl.css',
                            '!package.json',
                            '!package-lock.json',
                            '!style.asset.php',
                        ],
                        dest: 'build/<%= pkg.name %>',
                    },
                ],
            },
        },

        compress: {
            responsive_testimonial: {
                options: {
                    archive: 'build/testimonial.zip',
                },
                files: [
                    {
                        cwd: 'build/<%= pkg.name %>/',
                        dest: '<%= pkg.name %>/',
                        src: [ '**' ],
                    },
                ],
            },
        },

        replace: {
            php: {
                src: [
                    'class-' + pkg.name + '.php',
                    'includes/**/*.php',
                ],
                overwrite: true,
                replacements: [
                    {
                        from: /Version:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
                        to: 'Version:$1' + pkg.version,
                    },
                    {
                        from: /@since(.*?)NEXT/mg,
                        to: '@since$1' + pkg.version,
                    },
                    {
                        from: /Version:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
                        to: 'Version:$1' + pkg.version,
                    },
                    {
                        from: /Tested up to:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
                        to: 'Tested up to:$1' + pkg.tested_up_to,
                    },
                ],
            },
            readme: {
                src: 'readme.*',
                overwrite: true,
                replacements: [
                    {
                        from: /^(\*\*|)Stable tag:(\*\*|)(\s*?)[a-zA-Z0-9.-]+(\s*?)$/mi,
                        to: '$1Stable tag:$2$3<%= pkg.version %>$4',
                    },
                    {
                        from: /Tested up to:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
                        to: 'Tested up to:$1' + pkg.tested_up_to,
                    },
                ],
            },
            tests: {
                src: '.dev/tests/phpunit/**/*.php',
                overwrite: true,
                replacements: [
                    {
                        from: /\'version\'(\s*?)\=\>(\s*?)\'(.*)\'/,
                        to: '\'version\' \=\> \'<%= pkg.version %>\'',
                    },
                ],
            },
            languages: {
                src: 'languages/testimonial.pot',
                overwrite: true,
                replacements: [
                    {
                        from: /(Project-Id-Version: Responsive Testimonial Block )[0-9\.]+/,
                        to: '$1' + pkg.version,
                    },
                ],
            },
        },

        shell: {
            build: [ 'npm run build' ].join( ' && ' ),
            translations: [ 'npm run makepot' ].join( ' && ' ),
        },

    } );

    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    grunt.registerTask( 'build', [ 'shell:build', 'update-pot', 'replace', 'clean:build', 'copy:build', 'compress' ] );
    grunt.registerTask( 'update-pot', [ 'replace:languages' ] );
    grunt.registerTask( 'version', [ 'replace' ] );
};

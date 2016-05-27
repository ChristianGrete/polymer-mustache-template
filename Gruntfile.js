'use strict';

var

  _URL__ECMASCRIPT_BANNER_FILE = './config/banner.es',
  _URL__GRUNT_CONFIG_FILE = './config/grunt.json',
  _URL__MUSTACHE_BANNER_FILE = './config/banner.mustache',
  _URL__NPM_MANIFEST_FILE = './package.json',

  _gruntRegisterTasks = require('grunt-register-tasks'),
  _loadGruntTasks = require('load-grunt-tasks'),
  _timeGrunt = require('time-grunt');

module.exports = function ( $grunt ) {

    var

      _$grunt__file = $grunt.file,
      _$grunt__file__readJSON = _$grunt__file.readJSON,

      _TEMPLATE__ECMASCRIPT_BANNER
        = _$grunt__file.read( _URL__ECMASCRIPT_BANNER_FILE )
          + '\n',

      _plugins = [
          'grunt-bump',
          'grunt-contrib-*',
          'grunt-exec',
          'grunt-jsonlint',
          'grunt-modify-json',
          'grunt-string-replace',
          'grunt-ts*'
        ],

      _config = {
          'bump': {
              'options': {
                  'commit': true,
                  'commitFiles': [
                      '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__MANIFESTS %>'
                    ],
                  'commitMessage': 'bump(version): %VERSION%',
                  'createTag': false,
                  'files': '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__MANIFESTS %>',
                  'push': true,
                  'pushTo': 'origin',
                  'updateConfigs': [
                      null,
                      'pkg',
                      null
                    ]
                }
            },
          'cfg': _$grunt__file__readJSON( _URL__GRUNT_CONFIG_FILE ),
          'clean': {
              'dist': '<%= cfg.PATH__DIST %>',
              'root': [
                  '<%= cfg.PATH__ROOT %>/<%= cfg.FILE__DS_STORE %>',
                  '<%= cfg.PATH__ROOT %>/<%= cfg.FILE__NPM_DEBUG_LOG %>',
                  '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__ANY_BASEDIR %>',
                  '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__ANY_INDEX %>',
                  '<%= cfg.PATH__TSCACHE %>'
                ]
            },
          'concat': {
              'src.mustache': {
                  'cwd': '<%= cfg.PATH__SRC__MUSTACHE %>',
                  'dest': '<%= cfg.PATH__DIST %>',
                  'expand': true,
                  'options': {
                      'banner': _$grunt__file.read( _URL__MUSTACHE_BANNER_FILE )
                        + '\n'
                    },
                  'src': '<%= cfg.FILE__TEMPLATE_MUSTACHE %>'
                },
              'src.ts': {
                  'cwd': '<%= cfg.PATH__SRC__TS %>',
                  'dest': '<%= cfg.PATH__ROOT %>',
                  'expand': true,
                  'options': {
                      'banner': _TEMPLATE__ECMASCRIPT_BANNER
                    },
                  'src': '<%= cfg.FILE__INDEX_D_TS %>'
                }
            },
          'exec': {
              'commit': 'git commit -m "release(v<%= pkg.version %>): distribute"',
              'tag': 'git tag -a v<%= pkg.version %> -m "<%= grunt.option(\'message\') %>"'
            },
          'jsonlint': {
              'config': [
                  '<%= cfg.PATH__CONFIG %>/<%= cfg.GLOB__JSON__RECURSIVE %>',
                  '<%= cfg.PATH__ROOT %>/<%= cfg.FILE__BOWERRC %>'
                ],
              'manifests': '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__MANIFESTS %>'
            },
          'modify_json': {
              'manifests': {
                  'files': {
                      '<%= cfg.PATH__ROOT %>': '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__MANIFESTS %>'
                    },
                  'options': {
                      'fields': {
                          'private': false
                        },
                      'indent': 2
                    }
                }
            },
          'pkg': _$grunt__file__readJSON( _URL__NPM_MANIFEST_FILE ),
          'string-replace': {
              'readme': {
                  'files': [
                      {
                        'cwd': '<%= cfg.PATH__ROOT %>',
                        'dest': '<%= cfg.PATH__ROOT %>',
                        'expand': true,
                        'src': '<%= cfg.FILE__README_MD %>'
                      }
                    ],
                  'options': {
                      'replacements': [
                          {
                            'pattern': '<%= cfg.URL__RAWGIT_COM %>/<%= pkg.name %>/develop/<%= cfg.FILE__LOGO_SVG %>',
                            'replacement': '<%= cfg.URL__CDN_RAWGIT_COM %>/<%= pkg.name %>/v<%= pkg.version %>/<%= cfg.FILE__LOGO_SVG %>'
                          }
                        ]
                    }
                }
            },
          'ts': {
              'options': {
                  'fast': 'never',
                  'rootDir': '<%= cfg.PATH__SRC__TS %>'
                },
              'src': {
                  'outDir': '<%= cfg.PATH__ROOT %>',
                  'src': '<%= cfg.PATH__SRC__TS %>/<%= cfg.FILE__INDEX_TS %>',
                  'tsconfig': '<%= cfg.PATH__CONFIG %>/<%= cfg.FILE__TSCONFIG_JSON %>'
                }
            },
          'tslint': {
              'options': {
                  'configuration': '<%= cfg.PATH__CONFIG %>/<%= cfg.FILE__TSLINT_JSON %>'
                },
              'src': '<%= cfg.PATH__SRC__TS %>/<%= cfg.FILE__INDEX_TS %>'
            },
          'uglify': {
              'options': {
                  'banner': _TEMPLATE__ECMASCRIPT_BANNER,
                  'beautify': {
                      'beautify': true,
                      'indent_level': 2,
                      'quote_keys': true,
                      'semicolons': false
                    },
                  'compress': false,
                  'mangle': false,
                  'preserveComments': 'all',
                  'quoteStyle': 1
                },
              'root': {
                  'cwd': '<%= cfg.PATH__ROOT %>',
                  'dest': '<%= cfg.PATH__ROOT %>',
                  'expand': true,
                  'src': '<%= cfg.FILE__INDEX_JS %>'
                }
            }
        },

      _tasks = {
          'build': [
              'default',
              'clean',
              'concat',
              'ts',
              'uglify',
              'string-replace'
            ],
          'default': [
              'jsonlint',
              'tslint'
            ]
        };

    _timeGrunt( $grunt ),

    $grunt.initConfig( _config ),

    _loadGruntTasks(
      $grunt,
      {
        'pattern': _plugins,
        'scope': 'devDependencies'
      }
    ),

    _gruntRegisterTasks(
      $grunt,
      _tasks
    );

  };

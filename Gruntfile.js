'use strict';

var

  _URL__BANNER_FILE = './config/banner.mustache',
  _URL__GRUNT_CONFIG_FILE = './config/grunt.json',
  _URL__NPM_MANIFEST_FILE = './package.json',

  _gruntRegisterTasks = require('grunt-register-tasks'),
  _loadGruntTasks = require('load-grunt-tasks'),
  _timeGrunt = require('time-grunt');

module.exports = function ( $grunt ) {

    var

      _$grunt__file = $grunt.file,
      _$grunt__file__readJSON = _$grunt__file.readJSON,

      _plugins = [
          'grunt-bump',
          'grunt-contrib-*',
          'grunt-exec',
          'grunt-jsonlint',
          'grunt-modify-json',
          'grunt-string-replace'
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
                      'pkg'
                    ]
                }
            },
          'cfg': _$grunt__file__readJSON( _URL__GRUNT_CONFIG_FILE ),
          'clean': {
              'dist': '<%= cfg.PATH__DIST %>'
            },
          'copy': {
              'src': {
                  'cwd': '<%= cfg.PATH__SRC__MUSTACHE %>',
                  'dest': '<%= cfg.PATH__DIST %>',
                  'expand': true,
                  'src': '<%= cfg.FILE__TEMPLATE_MUSTACHE %>'
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
                      'add': true,
                      'fields': {
                          'private': false
                        },
                      'indent': 2
                    }
                }
            },
          'pkg': _$grunt__file__readJSON( _URL__NPM_MANIFEST_FILE ),
          'string-replace': {
              'dist': {
                  'files': [
                      {
                        'cwd': '<%= cfg.PATH__DIST %>',
                        'dest': '<%= cfg.PATH__DIST %>',
                        'expand': true,
                        'src': '<%= cfg.FILE__TEMPLATE_MUSTACHE %>'
                      }
                    ],
                  'options': {
                      'replacements': [
                          {
                            'pattern': /{{> banner }}/g,
                            'replacement': _$grunt__file.read( _URL__BANNER_FILE )
                          }
                        ]
                    }
                }
            }
        },

      _tasks = {
          'build': [
              'default',
              'clean',
              'copy',
              'string-replace'
            ],
          'default': [
              'jsonlint'
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

'use strict';

var

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
          'grunt-contrib-*',
          'grunt-jsonlint'
        ],

      _config = {
          'cfg': _$grunt__file__readJSON( _URL__GRUNT_CONFIG_FILE ),
          'copy': {
              'src': {
                  'cwd': '<%= cfg.PATH__SRC %>',
                  'dest': '<%= cfg.PATH__DIST %>',
                  'expand': true,
                  'src': '<%= cfg.FILE__TEMPLATE_MUSTACHE %>'
                }
            },
          'jsonlint': {
              'config': [
                  '<%= cfg.PATH__CONFIG %>/<%= cfg.GLOB__JSON__RECURSIVE %>',
                  '<%= cfg.PATH__ROOT %>/<%= cfg.FILE__BOWERRC %>'
                ],
              'manifests': '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__MANIFESTS %>'
            },
          'pkg': _$grunt__file__readJSON( _URL__NPM_MANIFEST_FILE )
        },

      _tasks = {
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

import * as _fs from 'fs';
import * as _path from 'path';

const _URL__GRUNT_CONFIG_FILE : string = './config/grunt.json';

interface GruntConfig {
  'FILE__TEMPLATE_MUSTACHE': string;
  'PATH__DIST': string;
}

const _gruntConfig : GruntConfig = JSON.parse(
    _fs.readFileSync(
      _URL__GRUNT_CONFIG_FILE,
      'utf8'
    )
  );

export const TEMPLATE : string = _fs.readFileSync(
    _path.join(
      _gruntConfig.PATH__DIST,
      _gruntConfig.FILE__TEMPLATE_MUSTACHE
    ),
    'utf8'
  );

export { TEMPLATE as default };

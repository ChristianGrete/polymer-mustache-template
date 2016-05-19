import * as _fs from 'fs';
import * as _path from 'path';

export const TEMPLATE : string = _fs.readFileSync(
    _path.join(
      __dirname,
      'dist/template.mustache'
    ),
    'utf8'
  );

export default TEMPLATE;

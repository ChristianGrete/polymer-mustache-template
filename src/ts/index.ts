import * as _fs from 'fs';

export const TEMPLATE : string = _fs.readFileSync(
    'dist/template.mustache',
    'utf8'
  );

export { TEMPLATE as default };

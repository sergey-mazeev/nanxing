import del from 'del';
import settings from '../config';

const clean = () => del([settings.paths.built]);

export default clean;

import ghPages from 'gulp-gh-pages';
import {dest, series, src} from 'gulp';

const deploy = () => src('./built/**/*')
    .pipe(ghPages());
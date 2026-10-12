import {rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
// Always rebuild from a clean output so unpublished or renamed articles disappear.
rmSync(new URL('../_site/', import.meta.url), {recursive:true, force:true});
execFileSync(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs'], {stdio:'inherit'});

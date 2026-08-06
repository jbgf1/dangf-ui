import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifactsDirectory = resolve(rootDirectory, '.artifacts');
const tarballPath = resolve(artifactsDirectory, 'dangf-ui-0.1.0.tgz');
const fixtures = ['vite-react18', 'next-react19'];

function run(arguments_, directory = rootDirectory) {
  execFileSync('pnpm', arguments_, {
    cwd: directory,
    stdio: 'inherit',
    env: { ...process.env, CI: '1' },
  });
}

rmSync(artifactsDirectory, { force: true, recursive: true });
mkdirSync(artifactsDirectory, { recursive: true });
run(['pack', '--pack-destination', artifactsDirectory]);

if (!existsSync(tarballPath)) {
  throw new Error(`Expected package tarball at ${tarballPath}`);
}

for (const fixture of fixtures) {
  const fixtureDirectory = resolve(rootDirectory, 'fixtures', fixture);
  rmSync(resolve(fixtureDirectory, 'node_modules'), { force: true, recursive: true });
  rmSync(resolve(fixtureDirectory, '.next'), { force: true, recursive: true });
  rmSync(resolve(fixtureDirectory, 'dist'), { force: true, recursive: true });
  run(['--ignore-workspace', 'install', '--frozen-lockfile=false'], fixtureDirectory);
  run(['--ignore-workspace', 'run', 'build'], fixtureDirectory);
}

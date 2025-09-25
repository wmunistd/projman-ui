import { execSync } from 'node:child_process';

export default async function globalSetup() {
  execSync('bash -lc "cd ../prova-A3 && ./clear-test-db"', { stdio: 'inherit' });
}

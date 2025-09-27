import { execSync } from 'node:child_process';

export default async function globalSetup() {
  execSync('cd ../prova-A3 && ./clear-test-db', { stdio: 'inherit' });
}

import { defineBddConfig } from 'playwright-bdd';
import { defineConfig } from '@playwright/test';

const testDir = defineBddConfig({
    features: 'sample.feature',
    steps: 'steps.js',
});

export default defineConfig({
    testDir,
    reporter: 'html',
});

import { cp, mkdir } from 'node:fs/promises';

const source = 'node_modules/@mediapipe/tasks-vision/wasm';
const destination = 'public/mediapipe/wasm';

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

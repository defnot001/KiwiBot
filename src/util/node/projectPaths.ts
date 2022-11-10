import path from 'path';
import { fileURLToPath } from 'url';

const currentPath = path.dirname(__dirname);
const sourcesPath = path.join(currentPath, '..');

const projectPaths = {
  sources: sourcesPath,
  commands: path.join(sourcesPath, 'commands'),
  events: path.join(sourcesPath, 'events'),
};

export default projectPaths;

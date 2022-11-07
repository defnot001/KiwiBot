import path from 'path';
import { fileURLToPath } from 'url';

const thisPath = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(thisPath, '..', '..');

export default sourcePath;
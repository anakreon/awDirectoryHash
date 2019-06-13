import { Node } from './Node';
import { OutputFormatter } from './DirectoryHasher';

export class JSONFormatter implements OutputFormatter {
    public format (node: Node): string {
        return JSON.stringify(node, null, ' ');
    }
}
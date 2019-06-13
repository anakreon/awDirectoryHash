import { FileSystem } from './FileSystem';
import { Hasher } from './Hasher';
import { Node } from './Node';
import { ContentConcatVisitor } from './ContentConcatVisitor';

export interface OutputFormatter {
    format (node: Node): string;
}

export class DirectoryHasher {
    constructor (private fileSystem: FileSystem, private hasher: Hasher, private formatter: OutputFormatter) {}

    public hashDirectory (directoryPath: string): string {
        const rootNode = new Node(directoryPath);
        this.hashRecursive(directoryPath, rootNode);
        this.setHashForDirectoryNode(rootNode);
        return this.formatter.format(rootNode);
    }

    private hashRecursive (directoryPath: string, parentNode: Node): void {
        const directory = this.fileSystem.readDirectory(directoryPath);
        for (var file = directory.next(); !file.done; file = directory.next()) {
            const node = new Node(file.value.fileName);
            if (file.value.isDirectory) {
                this.hashRecursive(file.value.filePath, node);
                this.setHashForDirectoryNode(node);
            } else {
                this.setHashForFileNode(node, file.value.filePath);
            }
            parentNode.addChild(node);
        }
    }

    private setHashForDirectoryNode (node: Node): void {
        const content = this.getDirectoryContent(node);
        this.setHashForNode(node, content);
    }

    private getDirectoryContent (node: Node): string {
        const directoryContentVisitor = new ContentConcatVisitor();
        node.visitChildren(directoryContentVisitor);
        return directoryContentVisitor.getContent();
    }

    private setHashForFileNode (node: Node, filePath: string): void {
        const content = this.getFileContent(filePath);
        this.setHashForNode(node, content);
    }

    private getFileContent (filePath: string): Buffer {
        return this.fileSystem.readFileAsBuffer(filePath);
    }

    private setHashForNode (node: Node, content: string | Buffer): void {
        const hash = this.hasher.hashValue(content);
        node.setValue(hash);
    }
}
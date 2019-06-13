export interface File {
    fileName: string;
    filePath: string;
    isDirectory: boolean;
}

export class FileSystem {
    constructor (private fs: any) {}
    
    public readFileAsBuffer (fileName: string): Buffer {
        return this.fs.readFileSync(fileName);
    }

    public * readDirectory (directoryPath: string): IterableIterator<File> {
        const dirents = this.fs.readdirSync(directoryPath, { withFileTypes: true });
        for (const dirent of dirents) {
            yield {
                fileName: dirent.name,
                filePath: directoryPath + '/' + dirent.name,
                isDirectory: dirent.isDirectory()
            };
        }
    }
}
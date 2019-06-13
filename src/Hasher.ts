export type CharacterEncoding = 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'base64' | 'latin1' | 'binary' | 'hex';
export interface HasherConfig {
    hashAlgorithm: string;
    hashEncoding: CharacterEncoding;
}

export class Hasher {
    private hashAlgorithm: string;
    private hashEncoding: CharacterEncoding;

    constructor (config: HasherConfig, private crypto: any) {
        this.hashAlgorithm = config.hashAlgorithm;
        this.hashEncoding = config.hashEncoding;
    }

    public hashValue (valueToHash: Buffer | string): string {
        const hash = this.crypto.createHash(this.hashAlgorithm);
        hash.update(valueToHash);
        return hash.digest(this.hashEncoding);
    }
}
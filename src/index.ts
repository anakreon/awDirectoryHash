import * as fs from 'fs';
import * as crypto from 'crypto';

import { DirectoryHasher } from './DirectoryHasher';
import { FileSystem } from './FileSystem';
import { Hasher, CharacterEncoding } from './Hasher';
import { JSONFormatter } from './JSONFormatter';

export interface Config {
    hashAlgorithm?: string;
    hashEncoding?: CharacterEncoding;
}

export const getInstance = (config: Config = {}): DirectoryHasher => {
    const hasherConfig = {
        hashAlgorithm: config.hashAlgorithm || 'sha256',
        hashEncoding: config.hashEncoding || 'hex'
    };
    const hasher = new Hasher(hasherConfig, crypto);
    const fileSystem = new FileSystem(fs);
    const outputFormatter = new JSONFormatter();
    return new DirectoryHasher(fileSystem, hasher, outputFormatter);
}

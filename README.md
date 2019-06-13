# awDirectoryHash

A NPM package that recursively reads a directory and creates a tree of file hashes.

## Installing

To install run: 
```shell
npm install awdirectoryhash
```

## Usage

Import the entry method:

```typescript
import { getInstance } from 'awdirectoryhash';
```

```typescript
interface Hasher {
    hashDirectory (directoryPath: string): string;
}

const hashConfig = {
    hashAlgorithm: 'sha256',
    hashEncoding: 'hex'
};
const hasher = getInstance(hashConfig);
const hash = hasher.hashDirectory(directoryPath);

```

## Running the tests

Run 
```shell
npm test
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Martin Hula** - *Initial work* - [anakreon](https://github.com/anakreon)

See also the list of [contributors](https://github.com/anakreon/awDirectoryHash/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

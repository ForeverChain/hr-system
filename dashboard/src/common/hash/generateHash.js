import { sha256 } from 'js-sha256';

export async function generateHash(string) {
    const hash = sha256.create();
    hash.update(string);
    return hash;
}

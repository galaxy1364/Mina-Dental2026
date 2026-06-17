import * as Crypto from 'expo-crypto';

/** Generate a RFC4122 v4 UUID (used for all local primary keys & sync ids). */
export function newId(): string {
  return Crypto.randomUUID();
}

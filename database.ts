import { UserIdentity } from '../shared/types';
const identities = new Map<string,UserIdentity>();
export async function storeIdentityProof(identity: UserIdentity) {
  identities.set(identity.userAddress, identity);
}
export async function getIdentityProof(userAddress: string) {
  return identities.get(userAddress);
}

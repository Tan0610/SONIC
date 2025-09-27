export function isProofExpired(expiresAt: number) {
  return Date.now() > expiresAt;
}
export function generateExpiryTimestamp(hours = 24) {
  return Date.now() + hours*3600000;
}

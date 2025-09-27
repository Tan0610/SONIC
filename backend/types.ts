export interface UserIdentity {
  userAddress: string;
  proofId: string;
  isHuman: boolean;
  ageRange: 'under_18'|'18+';
  country: string;
  language: string;
  verifiedAt: number;
  expiresAt: number;
}

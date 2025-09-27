import {NextApiRequest,NextApiResponse} from 'next';
import {storeIdentityProof} from '../../../lib/database';
import {generateExpiryTimestamp} from '../../../lib/utils';
import {UserIdentity} from '../../../shared/types';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method!=='POST')return res.status(405).json({error:'Only POST'});
  const {proofId,verified,attributes,userAddress}=req.body;
  if(!proofId||!userAddress) return res.status(400).json({error:'Missing proofId or userAddress'});
  if(verified){
    const identity:UserIdentity={
      userAddress,
      proofId,
      isHuman:!!attributes.unique_human,
      ageRange:attributes.age_over_18?'18+':'under_18',
      country:attributes.country||'',
      language:attributes.language||'en',
      verifiedAt:Date.now(),
      expiresAt:generateExpiryTimestamp(24)
    };
    await storeIdentityProof(identity);
  }
  res.status(200).json({success:true});
}

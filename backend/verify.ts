import {NextApiRequest,NextApiResponse} from 'next';
import {getIdentityProof} from '../../../lib/database';
import {isProofExpired} from '../../../lib/utils';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const userAddress=String(req.query.userAddress||'');
  if(!userAddress) return res.status(400).json({error:'Missing userAddress'});
  const identity=await getIdentityProof(userAddress);
  if(!identity||isProofExpired(identity.expiresAt)) return res.status(404).json({verified:false});
  res.status(200).json({
    verified:identity.isHuman,
    attributes:{ageRange:identity.ageRange,country:identity.country,language:identity.language},
    proofId:identity.proofId
  });
}

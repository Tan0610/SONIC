import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

import LighthouseService from '../lighthouse/lighthouse-service.js';
import { mintAudioNFT } from './flow-service.js';

dotenv.config();
console.log('Loaded LIGHTHOUSE_API_KEY:', process.env.LIGHTHOUSE_API_KEY ? 'Yes' : 'No');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Lighthouse service
const lighthouseService = new LighthouseService();

// Configure multer for memory storage and 50MB file size limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

/**
 * POST /api/audio/upload
 * Upload and encrypt audio, store on IPFS via Lighthouse
 */
app.post('/api/audio/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No audio file provided' });
    }

    const { buffer, originalname } = req.file;
    const metadata = {
      uploadedBy: req.body.userAddress || 'unknown',
      originalName: originalname,
      fileType: req.file.mimetype
    };

    console.log(`Processing audio upload: ${originalname}`);

    const uploadResult = await lighthouseService.processAndUploadAudio(buffer, originalname, metadata);

    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to upload audio to IPFS',
        details: uploadResult.error
      });
    }

    res.json({
      success: true,
      message: 'Audio uploaded successfully',
      data: {
        ipfsCID: uploadResult.ipfsCID,
        encryptionKey: uploadResult.encryptionKey,
        fileName: uploadResult.originalFileName,
        fileSize: uploadResult.fileSize,
        gatewayUrl: uploadResult.gatewayUrl
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during upload',
      details: error.message
    });
  }
});

/**
 * POST /api/nft/mint
 * Mint Audio NFT on Flow blockchain
 */
app.post('/api/nft/mint', async (req, res) => {
  try {
    const { recipientAddress, ipfsCID, metadata, identityProof } = req.body;

    if (!recipientAddress || !ipfsCID || !metadata) {
      return res.status(400).json({ success: false, error: 'Missing required fields: recipientAddress, ipfsCID, metadata' });
    }

    console.log(`Minting NFT for: ${recipientAddress}`);

    const nftMetadata = {
      ipfsCID,
      title: metadata.title || 'Audio NFT',
      artist: metadata.artist || 'Unknown',
      createdAt: new Date().toISOString(),
      identityVerified: identityProof ? 'true' : 'false',
      ...metadata
    };

    const mintResult = await mintAudioNFT(recipientAddress, ipfsCID, nftMetadata);

    if (!mintResult.status || mintResult.status !== 4) { // Flow tx sealed status = 4
      return res.status(500).json({
        success: false,
        error: 'Failed to mint NFT on Flow blockchain',
        details: mintResult
      });
    }

    res.json({
      success: true,
      message: 'Audio NFT minted successfully',
      data: {
        transactionId: mintResult.id || null,
        recipientAddress,
        ipfsCID,
        metadata: nftMetadata
      }
    });

  } catch (error) {
    console.error('Mint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during minting',
      details: error.message
    });
  }
});

/**
 * GET /api/nft/user/:address
 * Get all NFTs owned by a user
 */
app.get('/api/nft/user/:address', async (req, res) => {
  try {
    const { address } = req.params;

    console.log(`Getting NFTs for user: ${address}`);

    const nftIds = await flowService.getUserNFTIds(address);

    res.json({
      success: true,
      data: {
        userAddress: address,
        nftIds,
        totalCount: nftIds.length
      }
    });

  } catch (error) {
    console.error('Get user NFTs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user NFTs',
      details: error.message
    });
  }
});

/**
 * GET /api/nft/:address/:id
 * Get specific NFT details
 */
app.get('/api/nft/:address/:id', async (req, res) => {
  try {
    const { address, id } = req.params;

    console.log(`Getting NFT details: ${address}/${id}`);

    const nftDetails = await flowService.getAudioNFT(address, parseInt(id));

    if (!nftDetails) {
      return res.status(404).json({ success: false, error: 'NFT not found' });
    }

    res.json({ success: true, data: nftDetails });

  } catch (error) {
    console.error('Get NFT details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve NFT details',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SonicIPChain Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;

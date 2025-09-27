# SonicIPChain - Audio Tokenization dApp

## Overview

SonicIPChain is a blockchain-based decentralized application (dApp) that enables users to securely tokenize and monetize their audio assets. The platform provides a dual-portal experience with distinct interfaces for IP sellers (audio creators) and IP consumers (buyers/licensors). Key features include privacy-first identity verification via Self Protocol, client-side audio encryption with IPFS storage through Lighthouse SDK, and tokenization on the Flow blockchain using Cadence smart contracts. The application emphasizes audio-first design with sophisticated waveform visualizations, real-time audio processing, and demographic-based asset segmentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite build system
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack React Query for server state and data fetching
- **Routing**: Wouter library for lightweight client-side routing
- **Design System**: Custom design tokens following audio-first visual language with purple/blue gradients and glassmorphism effects

### Component Structure
- **Dual Portal System**: Separate interfaces for IP sellers and consumers with a switcher component
- **Audio Processing**: LiveMicrophone component with real-time speech recognition and waveform visualization
- **Upload System**: Drag-and-drop AudioUploadZone with client-side encryption status indicators
- **Marketplace**: AudioMarketplace with filtering, search, and demographic-based browsing
- **Identity Verification**: Integration components for Self Protocol verification flow

### Backend Architecture
- **Server Framework**: Express.js with TypeScript running on Node.js
- **Database Layer**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL (configured via @neondatabase/serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **API Structure**: RESTful endpoints with centralized error handling and request logging

### Data Storage Architecture
- **Primary Database**: PostgreSQL for user accounts and application state
- **Schema Management**: Drizzle migrations with type-safe schema definitions
- **File Storage**: IPFS via Lighthouse SDK for encrypted audio asset storage
- **Blockchain Storage**: Flow blockchain for NFT metadata and ownership records

### Authentication & Identity
- **Identity Verification**: Self Protocol integration for privacy-first human verification on Celo network
- **Wallet Integration**: Flow blockchain wallet connectivity for transaction signing
- **Session Management**: Server-side sessions with PostgreSQL storage
- **Authorization**: Role-based access control for seller vs consumer functionality

### Blockchain Integration
- **Primary Blockchain**: Flow blockchain for NFT minting and smart contracts
- **Smart Contracts**: Cadence language for tokenization logic
- **Identity Verification**: Self Protocol on Celo for human verification
- **Token Standards**: Flow NFT standards for audio asset representation

### Audio Processing Pipeline
- **Client-Side Recording**: Web Audio API for live microphone capture
- **Real-Time Features**: Speech-to-text transcription and audio level monitoring
- **Encryption**: Client-side encryption before IPFS upload via Lighthouse SDK
- **Visualization**: Canvas-based waveform rendering with interactive playback controls

## External Dependencies

### Blockchain Services
- **Flow Blockchain**: Primary blockchain for NFT minting and smart contracts
- **Self Protocol**: Identity verification service running on Celo network
- **Lighthouse SDK**: IPFS storage with built-in encryption capabilities

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **IPFS Network**: Decentralized file storage for encrypted audio assets

### Frontend Libraries
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS with custom design tokens and animations
- **Audio Processing**: Web Audio API for microphone access and real-time processing
- **Speech Recognition**: Browser native Speech Recognition API for transcription

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: TypeScript with strict configuration across frontend and backend
- **Database Tooling**: Drizzle Kit for migrations and schema management
- **Code Quality**: ESLint and TypeScript compiler for code validation

### Third-Party Integrations
- **Font Services**: Google Fonts for Inter, Space Grotesk, and JetBrains Mono
- **Asset Management**: Custom asset pipeline with Vite plugins for development
- **Error Handling**: Custom error overlay and monitoring for development environment
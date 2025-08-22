/**
 * Firestore Schema Types
 *
 * This file defines the TypeScript interfaces for the data models
 * stored in Firestore, ensuring type safety across the application.
 */

import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

// Based on the 12 Core Functional Dimensions

export interface Agent {
  id: string;
  ownerId: string; // UID of the user who owns this agent
  name: string;
  description?: string;
  // Represents the "萬能代理網絡 (Agent Network)"
  corePrompt: string;
  // Links to the "萬能符文系統 (Rune System)"
  linkedServices: ('straico' | 'gemini')[];
  createdAt: Timestamp;
}

export interface KnowledgeBase {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  // Represents the "萬能智庫中樞 (Knowledge Hub)"
  straicoRagId?: string; // If stored in Straico
  // Could also have fields for Gemini-based knowledge
  fileSourceUrls: string[]; // e.g., links to files in Firebase Storage
  createdAt: Timestamp;
}

export interface SyncMatrixJob {
  id: string;
  ownerId: string;
  // Represents the "萬能同步矩陣 (Sync Matrix)"
  sourcePlatform: string; // e.g., 'AITable.ai', 'Boost.space'
  targetPlatform: string; // e.g., 'Firestore', 'Straico'
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

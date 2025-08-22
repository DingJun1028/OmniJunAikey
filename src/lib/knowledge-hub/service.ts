/**
 * Knowledge Hub Service
 *
 * High-level service for managing knowledge bases.
 */
import { runeService } from '@/lib/rune-system';
import { createReadStream } from 'fs';
import { basename } from 'path';

export class KnowledgeHubService {
  /**
   * Creates a new knowledge base from a set of file paths.
   * @param name - The name of the knowledge base.
   * @param filePaths - An array of file paths to upload.
   * @returns The result from the underlying Rune Service.
   */
  public async createKnowledgeBase(name: string, filePaths: string[]) {
    console.log(`KnowledgeHubService: Creating KB '${name}'.`);

    const files = filePaths.map(path => ({
      stream: createReadStream(path),
      filename: basename(path),
    }));

    return runeService.createKnowledgeBase(name, files);
  }
}

export const knowledgeHubService = new KnowledgeHubService();

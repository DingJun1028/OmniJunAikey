// src/lib/scraper/index.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
// import puppeteer from 'puppeteer'; // We'll add this later

/**
 * This is the main entry point for the documentation scraper module.
 * It will export the primary `scrapeDocumentation` function.
 */

/**
 * Fetches and extracts the main content from a given documentation URL.
 * It handles GitHub repositories and generic websites.
 *
 * @param url The URL of the documentation to scrape.
 * @returns A promise that resolves to the cleaned Markdown content.
 */
export const scrapeDocumentation = async (url: string): Promise<string> => {
  console.log(`Scraping URL: ${url}`);

  if (isGitHubRepo(url)) {
    try {
      return await scrapeGitHubReadme(url);
    } catch (error) {
      console.error(`Failed to scrape GitHub repo: ${url}`, error);
      // Provide a more specific error message
      if (error instanceof Error) {
        throw new Error(`Could not retrieve README from GitHub repository: ${error.message}`);
      }
      throw new Error(`Could not retrieve README from GitHub repository.`);
    }
  }

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    return extractAndCleanContentFromHtml(html);
  } catch (error) {
    console.error(`Failed to scrape with axios/cheerio: ${url}`, error);
    // Future step: Fallback to Puppeteer for dynamic sites.
    throw new Error(`Failed to scrape content from URL: ${url}`);
  }
};

/**
 * Parses HTML, removes clutter, and extracts the main content as a clean string.
 * @param html The raw HTML string of a webpage.
 * @returns A clean string representing the main content.
 */
const extractAndCleanContentFromHtml = (html: string): string => {
  const $ = cheerio.load(html);
  $('script, style, nav, header, footer, aside, .noprint, .ads, [role="navigation"], [role="banner"], [role="complementary"], [role="contentinfo"]').remove();
  let contentElement = $('article').first();
  if (contentElement.length === 0) {
    contentElement = $('main').first();
  }
  if (contentElement.length === 0) {
    contentElement = $('body');
  }
  let extractedText = '';
  contentElement.find('h1, h2, h3, h4, h5, h6, p, li, pre, code, div').each((i, el) => {
    const text = $(el).text().trim();
    if (text) {
      extractedText += text + '\n\n';
    }
  });
  return extractedText.replace(/(\n\s*){3,}/g, '\n\n').trim();
};


/**
 * Checks if a URL is a GitHub repository URL.
 * @param url The URL to check.
 * @returns True if the URL is a GitHub repo.
 */
const isGitHubRepo = (url: string): boolean => {
  const githubRepoRegex = /^https?:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+/;
  return githubRepoRegex.test(url);
};

/**
 * Scrapes the README.md file from a GitHub repository by first finding its default branch.
 * @param repoUrl The URL of the GitHub repository.
 * @returns The content of the README.md file.
 */
const scrapeGitHubReadme = async (repoUrl: string): Promise<string> => {
  const urlParts = new URL(repoUrl);
  const pathParts = urlParts.pathname.split('/').filter(Boolean);

  if (pathParts.length < 2) {
    throw new Error('Invalid GitHub repository URL');
  }

  const owner = pathParts[0];
  const repo = pathParts[1].replace(/\.git$/, ''); // Clean .git suffix if present

  // 1. Fetch repository data from GitHub API to find the default branch
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  let defaultBranch = '';

  try {
    const repoInfoResponse = await axios.get(apiUrl);
    defaultBranch = repoInfoResponse.data.default_branch;
    if (!defaultBranch) {
      throw new Error('default_branch not found in API response.');
    }
    console.log(`Found default branch: ${defaultBranch}`);
  } catch (error: any) {
    console.error(`Failed to fetch repo info from GitHub API: ${apiUrl}`, error.message);
    throw new Error('Could not fetch repository metadata from GitHub API.');
  }

  // 2. Fetch the README from the raw content URL using the default branch
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/README.md`;
  console.log(`Fetching README from: ${rawUrl}`);

  try {
    const readmeResponse = await axios.get(rawUrl);
    return readmeResponse.data;
  } catch (error: any) {
    console.error(`Failed to fetch README from ${rawUrl}`, error.message);
    // Also try readme.md in lowercase, as it's also common
    const lcRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/readme.md`;
    console.log(`Fetching README from: ${lcRawUrl}`);
    try {
      const lcReadmeResponse = await axios.get(lcRawUrl);
      return lcReadmeResponse.data;
    } catch (lcError: any) {
      console.error(`Failed to fetch readme.md from ${lcRawUrl}`, lcError.message);
      throw new Error('Could not find README.md or readme.md in the default branch.');
    }
  }
};

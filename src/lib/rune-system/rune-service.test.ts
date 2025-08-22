import { RuneService } from './rune-service';
import { StraicoClient } from './straico-client';
import { GeminiClient } from './gemini-client';

// Mock the clients
jest.mock('./straico-client');
jest.mock('./gemini-client');

const MockedStraicoClient = StraicoClient as jest.MockedClass<typeof StraicoClient>;
const MockedGeminiClient = GeminiClient as jest.MockedClass<typeof GeminiClient>;

describe('RuneService', () => {
  let runeService: RuneService;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedStraicoClient.mockClear();
    MockedGeminiClient.mockClear();
    runeService = new RuneService();
  });

  it('should initialize both Straico and Gemini clients', () => {
    expect(StraicoClient).toHaveBeenCalledTimes(1);
    expect(GeminiClient).toHaveBeenCalledTimes(1);
  });

  it('should call GeminiClient when provider is "gemini"', async () => {
    const prompt = 'Hello Gemini';
    const mockGeminiResponse = 'Response from Gemini';

    // Mock the specific method on the instance
    const geminiInstance = MockedGeminiClient.mock.instances[0];
    (geminiInstance.generateText as jest.Mock).mockResolvedValue(mockGeminiResponse);

    const response = await runeService.generateText(prompt, 'gemini');

    expect(geminiInstance.generateText).toHaveBeenCalledWith(prompt);
    expect(response).toBe(mockGeminiResponse);
  });

  it('should call StraicoClient when provider is "straico"', async () => {
    const prompt = 'Hello Straico';
    const mockStraicoResponse = { completion: 'Response from Straico' };

    const straicoInstance = MockedStraicoClient.mock.instances[0];
    (straicoInstance.promptAgent as jest.Mock).mockResolvedValue(mockStraicoResponse);

    const response = await runeService.generateText(prompt, 'straico');

    // Assumes a default agent ID is handled inside the service or client
    expect(straicoInstance.promptAgent).toHaveBeenCalledWith(expect.any(String), prompt);
    expect(response).toBe(mockStraicoResponse.completion);
  });

  it('should throw an error for an unknown provider', async () => {
    const prompt = 'Hello world';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await expect(runeService.generateText(prompt, 'unknown')).rejects.toThrow(
      'Unknown AI provider: unknown'
    );
  });
});

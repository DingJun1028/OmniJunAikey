# OmniJunAikey

OmniJunAikey is a comprehensive AI key management solution that allows you to manage and utilize API keys for various AI services in one unified platform.

## Features

- Support for multiple AI providers (OpenAI, Anthropic, Google, Azure, Cohere, Hugging Face)
- Secure API key management
- Rate limiting and usage tracking
- Environment-based configuration
- Easy setup and deployment

## Setup

### 1. Environment Configuration

Copy the example environment file and configure your API keys:

```bash
cp .env.example .env
```

Edit the `.env` file and add your actual API keys:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_actual_openai_api_key
OPENAI_MODEL=gpt-3.5-turbo

# Anthropic Claude API Configuration
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
ANTHROPIC_MODEL=claude-3-haiku-20240307

# Add other API keys as needed...
```

### 2. Security Notice

⚠️ **Important**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it automatically.

### 3. Required API Keys

To use OmniJunAikey, you'll need API keys from one or more of these providers:

- **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Anthropic**: Get your API key from [Anthropic Console](https://console.anthropic.com/)
- **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Azure OpenAI**: Get your credentials from [Azure Portal](https://portal.azure.com/)
- **Cohere**: Get your API key from [Cohere Dashboard](https://dashboard.cohere.ai/)
- **Hugging Face**: Get your API key from [Hugging Face Settings](https://huggingface.co/settings/tokens)

## Configuration Options

The `.env` file supports the following configuration categories:

- **AI Provider APIs**: API keys and model configurations
- **Application Settings**: App name, version, debug mode
- **Database**: Database connection settings
- **Security**: Encryption keys and secrets
- **Rate Limiting**: Request limits per minute/hour
- **Server**: Port and host configuration

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env`
3. Configure your API keys in the `.env` file
4. Start using OmniJunAikey with your preferred AI services

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

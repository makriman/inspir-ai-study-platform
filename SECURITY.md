# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it privately. Do not disclose it publicly until we have had a chance to fix it.

**Please report security issues to:**
- Email: security@inspir.uk

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Best Practices for Development

### Environment Variables

- Never commit `.env` files or files containing real credentials.
- Use `.env.example` templates for required variables.
- All scripts attempting to access the database or external APIs must load credentials from environment variables using `dotenv`.

### Database Access

- Do not hardcode service role keys or database passwords in scripts.
- Use `process.env.SUPABASE_SERVICE_ROLE_KEY` or similar.
- Ensure scripts check for the existence of required environment variables before proceeding.

### Local Development

- When running scripts locally, ensure you have the correct `.env` file in the `backend/` or relevant directory.
- Do not bypass security checks in scripts.

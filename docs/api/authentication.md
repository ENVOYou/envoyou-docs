---
sidebar_position: 4
---

# Authentication

Envoyou SEC API uses two primary authentication methods depending on the endpoint and use case.

## Authentication Methods

### 1. API Key Authentication

Used for most SEC API endpoints including emissions calculations, EPA validation, and SEC exports.

**Header Format**:
```
X-API-Key: your_api_key_here
```

**Example**:
```bash
curl -X POST "https://api.envoyou.com/v1/emissions/calculate" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: evo_prod_1234567890abcdef" \
  -d '{"company": "Demo Corp", ...}'
```

### 2. JWT Bearer Token Authentication

Used for user-specific operations, profile management, and admin endpoints.

**Header Format**:
```
Authorization: Bearer your_jwt_token_here
```

**Example**:
```bash
curl -X GET "https://api.envoyou.com/user/profile" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Getting Your API Key

### Step 1: Register Account

First, create an account at [app.envoyou.com](https://app.envoyou.com):

```bash
curl -X POST "https://api.envoyou.com/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@company.com",
    "password": "SecurePass123!",
    "name": "Your Name",
    "company": "Your Company"
  }'
```

### Step 2: Login and Get JWT Token

```bash
curl -X POST "https://api.envoyou.com/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@company.com",
    "password": "SecurePass123!"
  }'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

### Step 3: Create API Key

Use your JWT token to create an API key:

```bash
curl -X POST "https://api.envoyou.com/user/api-keys" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SEC Compliance Key",
    "permissions": ["emissions:calculate", "validation:epa", "export:sec"]
  }'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "key_12345",
    "name": "SEC Compliance Key",
    "api_key": "evo_sec_1234567890abcdef",
    "permissions": ["emissions:calculate", "validation:epa", "export:sec"]
  }
}
```

## API Key Permissions

API keys can be created with specific permissions:

- **emissions:calculate** - Access to emissions calculation endpoints
- **validation:epa** - Access to EPA cross-validation endpoints  
- **export:sec** - Access to SEC export and package generation
- **admin:mappings** - Access to company-facility mapping (admin only)
- **audit:read** - Access to audit trail data (inspector/admin only)

## Security Best Practices

### API Key Security

1. **Store Securely**: Never commit API keys to version control
2. **Use Environment Variables**: Store keys in environment variables
3. **Rotate Regularly**: Regenerate keys periodically
4. **Limit Permissions**: Only grant necessary permissions
5. **Monitor Usage**: Track API key usage in your dashboard

### JWT Token Security

1. **Short Expiration**: Tokens expire in 1 hour by default
2. **Secure Storage**: Store tokens securely in your application
3. **Refresh Tokens**: Use refresh tokens for long-running applications
4. **HTTPS Only**: Always use HTTPS for token transmission

## Rate Limits

Rate limits vary by subscription tier:

| Tier | Requests per Minute | Monthly Quota |
|------|-------------------|---------------|
| Basic | 30 | 1,000 |
| Premium | 100 | 10,000 |
| Enterprise | 500 | Unlimited |

**Rate Limit Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Error Handling

### Authentication Errors

**401 Unauthorized**:
```json
{
  "status": "error",
  "error": "Invalid API key",
  "data": null
}
```

**403 Forbidden**:
```json
{
  "status": "error",
  "error": "Insufficient permissions for this endpoint",
  "data": null
}
```

**429 Too Many Requests**:
```json
{
  "status": "error",
  "error": "Rate limit exceeded",
  "data": {
    "retry_after": 60
  }
}
```

## Testing Authentication

### Health Check (No Auth Required)
```bash
curl -X GET "https://api.envoyou.com/health"
```

### Test API Key
```bash
curl -X GET "https://api.envoyou.com/v1/emissions/factors" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Test JWT Token
```bash
curl -X GET "https://api.envoyou.com/user/profile" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Demo API Keys

For testing purposes, you can request a demo API key:

```bash
curl -X POST "https://api.envoyou.com/admin/request-demo-key" \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Demo User"
  }'
```

**Demo keys have limitations**:
- 30 requests per minute
- 7-day expiration
- Basic tier permissions only

---

**Need help with authentication?** Contact our support team at [support@envoyou.com](mailto:support@envoyou.com).
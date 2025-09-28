---
sidebar_position: 3
---

# Getting Started

## How to Register, Login, Get API Key

### 1. Register Account
- Visit [app.envoyou.com](https://app.envoyou.com/)
- Click [Sign Up](https://app.envoyou.com/auth/register)
- Enter email, password (min 8 characters with uppercase, lowercase, numbers), name, company
- Verify email via sent link

### 2. Login
- Login with email and password
- Receive access token and refresh token

### 3. Get API Key
- After login, go to Developer Dashboard
- Select tier: Basic (free), Premium, Enterprise
- Generate API key for SEC API endpoint authentication

## SEC Compliance Quickstart

### Step 1: Calculate Emissions

**Using cURL**:
```bash
curl -X POST https://api.envoyou.com/v1/emissions/calculate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "company": "Demo Corp",
    "scope1": {
      "fuel_type": "natural_gas",
      "amount": 1000,
      "unit": "mmbtu"
    },
    "scope2": {
      "kwh": 500000,
      "grid_region": "RFC"
    }
  }'
```

### Step 2: Validate Against EPA

```bash
curl -X POST https://api.envoyou.com/v1/validation/epa \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "company": "Demo Corp",
    "scope1": {
      "fuel_type": "natural_gas",
      "amount": 1000,
      "unit": "mmbtu"
    },
    "scope2": {
      "kwh": 500000,
      "grid_region": "RFC"
    }
  }'
```

### Step 3: Generate SEC Package

```bash
curl -X POST https://api.envoyou.com/v1/export/sec/package \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "company": "Demo Corp",
    "scope1": {
      "fuel_type": "natural_gas",
      "amount": 1000,
      "unit": "mmbtu"
    },
    "scope2": {
      "kwh": 500000,
      "grid_region": "RFC"
    }
  }'
```

## Programming Language Examples

### Using Python

```python
import requests

# Login
response = requests.post('https://api.envoyou.com/auth/login', json={
    'email': 'user@example.com',
    'password': 'Password123'
})
token = response.json()['access_token']

# Calculate emissions
headers = {
    'Authorization': f'Bearer {token}',
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
}

emissions_data = {
    "company": "Demo Corp",
    "scope1": {"fuel_type": "natural_gas", "amount": 1000, "unit": "mmbtu"},
    "scope2": {"kwh": 500000, "grid_region": "RFC"}
}

result = requests.post(
    'https://api.envoyou.com/v1/emissions/calculate',
    headers=headers,
    json=emissions_data
)
print(result.json())
```

### Using JavaScript

```javascript
// Login
const loginResponse = await fetch('https://api.envoyou.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'Password123'
  })
});
const { access_token } = await loginResponse.json();

// Calculate emissions
const emissionsData = {
  company: "Demo Corp",
  scope1: { fuel_type: "natural_gas", amount: 1000, unit: "mmbtu" },
  scope2: { kwh: 500000, grid_region: "RFC" }
};

const result = await fetch('https://api.envoyou.com/v1/emissions/calculate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(emissionsData)
});

const data = await result.json();
console.log(data);
```

## Authentication Methods

### API Key Authentication
For most SEC API endpoints, use API Key authentication:
```bash
-H "X-API-Key: YOUR_API_KEY"
```

### JWT Bearer Token
For user-specific operations and admin endpoints:
```bash
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---
sidebar_position: 5
---

# API Reference

**Base URL**: `https://api.envoyou.com`

---

## Authentication Endpoints

### POST /auth/login

<span className="api-method post">POST</span> `/auth/login`

Authenticate user and get JWT tokens.

**Authentication**: None required

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": "user_12345",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "company": "GreenTech Solutions",
      "tier": "premium"
    }
  }
}
```

### POST /auth/register

<span className="api-method post">POST</span> `/auth/register`

Register a new user account.

**Authentication**: None required

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "company": "GreenTech Solutions"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": {
    "email_sent": true,
    "verification_required": true
  }
}
```

---

## Emissions Calculation Endpoints

### POST /v1/emissions/calculate

<span className="api-method post">POST</span> `/v1/emissions/calculate`

Calculate Scope 1 & 2 emissions with automatic audit trail.

**Authentication**: API Key required

**Request Body**:
```json
{
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
}
```

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "company": "Demo Corp",
    "scope1_emissions": {
      "co2_tons": 53.02,
      "fuel_type": "natural_gas",
      "amount": 1000,
      "unit": "mmbtu",
      "emission_factor": 0.05302,
      "factor_source": "EPA"
    },
    "scope2_emissions": {
      "co2_tons": 225.5,
      "kwh": 500000,
      "grid_region": "RFC",
      "emission_factor": 0.000451,
      "factor_source": "EPA eGRID"
    },
    "total_emissions": 278.52,
    "calculation_id": "calc_12345",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

### GET /v1/emissions/factors

<span className="api-method get">GET</span> `/v1/emissions/factors`

Get available emission factors and sources.

**Authentication**: API Key required

**Query Parameters**:
- `fuel_type`: string (optional) - Filter by fuel type
- `source`: string (optional) - Filter by source (EPA, EDGAR)

**Response (200)**:
```json
{
  "status": "success",
  "data": [
    {
      "fuel_type": "natural_gas",
      "emission_factor": 0.05302,
      "unit": "tons_co2_per_mmbtu",
      "source": "EPA",
      "last_updated": "2024-01-01T00:00:00Z"
    },
    {
      "fuel_type": "coal",
      "emission_factor": 0.09552,
      "unit": "tons_co2_per_mmbtu",
      "source": "EPA",
      "last_updated": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /v1/emissions/units

<span className="api-method get">GET</span> `/v1/emissions/units`

Get supported units for emissions calculations.

**Authentication**: API Key required

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "fuel_units": ["mmbtu", "therms", "gallons", "tons"],
    "electricity_units": ["kwh", "mwh"],
    "emission_units": ["tons_co2", "kg_co2", "lbs_co2"]
  }
}
```

---

## EPA Validation Endpoints

### POST /v1/validation/epa

<span className="api-method post">POST</span> `/v1/validation/epa`

Cross-validate emissions against EPA data.

**Authentication**: API Key required

**Request Body**:
```json
{
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
}
```

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "company": "Demo Corp",
    "validation_result": {
      "status": "validated",
      "total_calculated": 278.52,
      "epa_comparison": {
        "facilities_found": 2,
        "avg_emissions": 285.1,
        "deviation_percent": -2.3,
        "within_threshold": true
      },
      "recommendations": [
        "Emissions within expected range for similar facilities",
        "Consider reviewing Scope 2 calculations for accuracy"
      ]
    },
    "validation_id": "val_12345",
    "timestamp": "2025-01-15T10:35:00Z"
  }
}
```

---

## SEC Export Endpoints

### GET /v1/export/sec/cevs/{company}

<span className="api-method get">GET</span> `/v1/export/sec/cevs/{company}`

Export CEVS data for SEC filing.

**Authentication**: API Key required

**Parameters**:
- `company`: string (required) - Company name

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "company": "Demo Corp",
    "cevs_data": {
      "scope1_emissions": 53.02,
      "scope2_emissions": 225.5,
      "total_emissions": 278.52,
      "calculation_date": "2025-01-15",
      "methodology": "EPA emission factors",
      "verification_status": "EPA validated"
    },
    "sec_format": {
      "table_format": "10-K compliant",
      "export_date": "2025-01-15T10:40:00Z"
    }
  }
}
```

### POST /v1/export/sec/package

<span className="api-method post">POST</span> `/v1/export/sec/package`

Generate complete SEC filing package.

**Authentication**: API Key required

**Request Body**:
```json
{
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
}
```

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "package_id": "pkg_12345",
    "company": "Demo Corp",
    "files": [
      {
        "filename": "emissions_calculation.json",
        "type": "calculation_data",
        "size_bytes": 2048
      },
      {
        "filename": "audit_trail.csv",
        "type": "audit_data",
        "size_bytes": 1024
      },
      {
        "filename": "sec_filing_table.csv",
        "type": "sec_format",
        "size_bytes": 512
      }
    ],
    "download_url": "https://api.envoyou.com/downloads/pkg_12345.zip",
    "expires_at": "2025-01-22T10:45:00Z"
  }
}
```

---

## User Management Endpoints

### GET /user/profile

<span className="api-method get">GET</span> `/user/profile`

Get user profile information.

**Authentication**: Bearer Token required

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "user_12345",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "company": "GreenTech Solutions",
    "tier": "premium",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

### GET /user/api-keys

<span className="api-method get">GET</span> `/user/api-keys`

List user's API keys.

**Authentication**: Bearer Token required

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "key_12345",
      "name": "Production Key",
      "key_prefix": "evo_prod_",
      "tier": "premium",
      "permissions": ["emissions:calculate", "validation:epa", "export:sec"],
      "created_at": "2025-01-01T00:00:00Z",
      "last_used_at": "2025-01-15T10:30:00Z"
    }
  ]
}
```

### POST /user/api-keys

<span className="api-method post">POST</span> `/user/api-keys`

Create new API key.

**Authentication**: Bearer Token required

**Request Body**:
```json
{
  "name": "SEC Compliance Key",
  "permissions": ["emissions:calculate", "validation:epa", "export:sec"]
}
```

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "key_67890",
    "name": "SEC Compliance Key",
    "api_key": "evo_sec_1234567890abcdef",
    "permissions": ["emissions:calculate", "validation:epa", "export:sec"],
    "created_at": "2025-01-15T10:45:00Z"
  }
}
```

---

## Admin Endpoints (Premium)

### POST /v1/admin/mappings

<span className="api-method post">POST</span> `/v1/admin/mappings`

Create company-facility mapping.

**Authentication**: Bearer Token required (Admin role)

**Request Body**:
```json
{
  "company_name": "Demo Corp",
  "facilities": [
    {
      "name": "Main Plant",
      "epa_facility_id": "12345",
      "address": "123 Industrial Blvd",
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  ]
}
```

### GET /v1/audit

<span className="api-method get">GET</span> `/v1/audit`

Get audit trail entries.

**Authentication**: Bearer Token required (Admin/Inspector role)

**Query Parameters**:
- `company`: string (optional) - Filter by company
- `start_date`: string (optional) - Start date (ISO format)
- `end_date`: string (optional) - End date (ISO format)
- `limit`: integer (optional) - Number of results (default: 50)

**Response (200)**:
```json
{
  "status": "success",
  "data": [
    {
      "id": "audit_12345",
      "company": "Demo Corp",
      "calculation_id": "calc_12345",
      "inputs": {
        "scope1": {"fuel_type": "natural_gas", "amount": 1000},
        "scope2": {"kwh": 500000, "grid_region": "RFC"}
      },
      "factors_used": {
        "natural_gas": 0.05302,
        "electricity_rfc": 0.000451
      },
      "timestamp": "2025-01-15T10:30:00Z",
      "user_id": "user_12345"
    }
  ],
  "total": 1,
  "has_more": false
}
```

---

## Health Check

### GET /health

<span className="api-method get">GET</span> `/health`

API health check.

**Authentication**: None required

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "status": "healthy",
    "timestamp": "2025-01-15T10:50:00Z",
    "version": "1.0.0",
    "environment": "production"
  }
}
```

---

## Response Format

All responses follow the consistent Envoyou format:

**Success Response (200)**:
```json
{
  "status": "success",
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

**Error Response (4xx/5xx)**:
```json
{
  "status": "error",
  "error": "Error description",
  "data": null
}
```

**Common HTTP Status Codes**:
- `200`: Success
- `201`: Created
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (invalid/missing API key or token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

**Authentication Methods**:
- **API Key**: Include in header `X-API-Key: your_api_key`
- **Bearer Token**: Include in header `Authorization: Bearer your_jwt_token`
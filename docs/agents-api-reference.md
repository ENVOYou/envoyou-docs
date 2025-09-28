# 🤖 Agents API Reference

## Authentication

All agents endpoints require authentication via API key:

```bash
curl -H "X-API-Key: your_api_key" \
     -H "Content-Type: application/json" \
     https://api.envoyou.com/v1/agents/...
```

## Core Workflows

### Full Compliance Workflow

**Endpoint:** `POST /v1/agents/full-workflow`

Complete SEC compliance analysis using all agents.

**Request:**
```json
{
  "company": "Tesla Manufacturing Corp",
  "scope1": {
    "fuel_type": "natural_gas",
    "amount": 2500,
    "unit": "mmbtu"
  },
  "scope2": {
    "kwh": 1200000,
    "grid_region": "WECC"
  },
  "reporting_period": "2024"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "summary": {
      "sec_filing_readiness": "ready",
      "confidence_scores": {
        "epa_validation": 85.2,
        "sec_compliance": 88.7
      },
      "quality_scores": {
        "overall": 92.6,
        "accuracy": 90.0,
        "completeness": 95.0
      }
    },
    "recommendations": [
      {
        "priority": "high",
        "recommendation": "Excellent confidence - ready for SEC filing"
      }
    ]
  }
}
```

### Validate and Score

**Endpoint:** `POST /v1/agents/validate-and-score`

Quick validation and scoring using data quality and EPA agents.

**Request:**
```json
{
  "company": "General Motors",
  "scope1": {"fuel_type": "diesel", "amount": 1000, "unit": "gallon"},
  "scope2": {"kwh": 500000, "grid_region": "RFC"}
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "quality_score": 87.3,
    "epa_confidence": 82.1,
    "overall_assessment": "good",
    "issues_found": 2,
    "recommendations": [
      "Review EPA facility matches for accuracy"
    ]
  }
}
```

## Individual Agents

### Data Quality Agent

**Endpoint:** `POST /v1/agents/data-quality`

Comprehensive data quality assessment.

**Response:**
```json
{
  "status": "success",
  "data": {
    "quality_scores": {
      "overall_score": 92.6,
      "dimension_scores": {
        "accuracy": 85.0,
        "completeness": 96.3,
        "consistency": 90.0,
        "timeliness": 95.0,
        "validity": 100.0
      }
    },
    "anomalies": {
      "total_anomalies": 1,
      "detected": [
        {
          "type": "magnitude_anomaly",
          "severity": "medium",
          "description": "Scope 2 energy much higher than Scope 1"
        }
      ]
    }
  }
}
```

### EPA Validation Agent

**Endpoint:** `POST /v1/agents/epa-validation`

EPA cross-validation with confidence scoring.

**Parameters:**
- `state` (optional): Filter by state
- `year` (optional): Validation year

**Response:**
```json
{
  "status": "success",
  "data": {
    "epa_matches": [
      "GENERAL MOTORS LLC (MI, Wayne)",
      "GM LANSING GRAND RIVER (MI, Lansing)"
    ],
    "matches_count": 15,
    "confidence_score": 92.5,
    "enhanced_confidence": {
      "score": 88.3,
      "level": "high",
      "recommendation": "High confidence - ready for SEC filing"
    }
  }
}
```

### SEC Compliance Agent

**Endpoint:** `POST /v1/agents/sec-compliance`

Complete SEC compliance analysis and package generation.

**Response:**
```json
{
  "status": "success",
  "data": {
    "emissions": {
      "totals": {
        "emissions_kg": 303520.0,
        "emissions_tonnes": 303.52
      }
    },
    "confidence": {
      "score": 95,
      "level": "very_high",
      "recommendation": "Excellent confidence - ready for SEC filing"
    },
    "sec_package": {
      "generated": true,
      "files": ["cevs.json", "audit.csv", "summary.txt"]
    }
  }
}
```

## Reporting Endpoints

### Audit Report

**Endpoint:** `GET /v1/agents/audit-report/{company}`

Generate comprehensive audit report.

**Parameters:**
- `report_type`: `compliance`, `forensic`, or `summary`

**Response:**
```json
{
  "status": "success",
  "data": {
    "report": {
      "report_type": "SEC Compliance Audit Report",
      "total_entries": 25,
      "compliance_score": 98.5
    },
    "metadata": {
      "company": "Tesla Corp",
      "generated_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

### Agent Status

**Endpoint:** `GET /v1/agents/status`

Get status of all agents and system health.

**Response:**
```json
{
  "status": "success",
  "data": {
    "available_agents": [
      "sec_compliance",
      "epa_validation", 
      "audit_trail",
      "data_quality"
    ],
    "system_health": "healthy",
    "epa_endpoints_status": {
      "primary": "healthy",
      "backup": "healthy"
    }
  }
}
```

## Error Responses

All endpoints return standardized error responses:

```json
{
  "status": "error",
  "message": "Validation failed: company is required",
  "code": "VALIDATION_ERROR",
  "details": {
    "missing_fields": ["company"]
  }
}
```

## Rate Limits

- **Basic Plan**: 100 requests/hour
- **Pro Plan**: 1,000 requests/hour  
- **Enterprise**: Custom limits

## SDKs

Official SDKs available for:
- Python: `pip install envoyou-sdk`
- JavaScript: `npm install @envoyou/sdk`
- Go: `go get github.com/envoyou/go-sdk`

## Support

- **Documentation**: [docs.envoyou.com](https://docs.envoyou.com)
- **API Status**: [status.envoyou.com](https://status.envoyou.com)
- **Support**: [support@envoyou.com](mailto:support@envoyou.com)
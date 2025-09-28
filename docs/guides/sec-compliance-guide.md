---
sidebar_position: 1
---

# SEC Climate Disclosure Compliance Guide

This comprehensive guide walks you through implementing SEC Climate Disclosure compliance using the Envoyou SEC API.

## Overview

The SEC Climate Disclosure rules require public companies to report Scope 1 and Scope 2 greenhouse gas emissions in their annual reports. This guide covers:

- Understanding SEC requirements
- Implementing emissions calculations
- EPA cross-validation process
- Generating SEC-ready reports
- Maintaining audit trails

## SEC Requirements Summary

### What Must Be Reported

**Scope 1 Emissions**: Direct emissions from sources owned or controlled by the company
- Fuel combustion in company facilities
- Company-owned vehicles and equipment
- Industrial processes and fugitive emissions

**Scope 2 Emissions**: Indirect emissions from purchased energy
- Purchased electricity
- Purchased steam, heating, and cooling

### Reporting Standards

- **Methodology**: Must use EPA emission factors or equivalent
- **Verification**: Calculations must be auditable and traceable
- **Format**: Must be included in 10-K filings in specified format
- **Timeline**: Annual reporting with specific deadlines

## Step-by-Step Implementation

### Step 1: Set Up Authentication

First, obtain your API credentials:

```bash
# Register account
curl -X POST "https://api.envoyou.com/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "compliance@yourcompany.com",
    "password": "SecurePass123!",
    "name": "Compliance Officer",
    "company": "Your Company Name"
  }'

# Login and get JWT token
curl -X POST "https://api.envoyou.com/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "compliance@yourcompany.com",
    "password": "SecurePass123!"
  }'

# Create API key with SEC permissions
curl -X POST "https://api.envoyou.com/user/api-keys" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SEC Compliance 2024",
    "permissions": ["emissions:calculate", "validation:epa", "export:sec", "audit:read"]
  }'
```

### Step 2: Gather Emissions Data

Collect your company's emissions data:

**Scope 1 Data Needed**:
- Fuel types and quantities consumed
- Units of measurement (MMBtu, therms, gallons, etc.)
- Facility locations and operations

**Scope 2 Data Needed**:
- Electricity consumption (kWh or MWh)
- Grid regions for each facility
- Purchased steam/heating/cooling quantities

### Step 3: Calculate Emissions

Use the API to calculate your emissions:

```bash
curl -X POST "https://api.envoyou.com/v1/emissions/calculate" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "company": "Your Company Name",
    "reporting_year": 2024,
    "scope1": {
      "natural_gas": {
        "amount": 50000,
        "unit": "mmbtu"
      },
      "diesel": {
        "amount": 10000,
        "unit": "gallons"
      }
    },
    "scope2": {
      "electricity": [
        {
          "amount": 2500000,
          "unit": "kwh",
          "grid_region": "RFC",
          "facility": "Main Plant"
        },
        {
          "amount": 1200000,
          "unit": "kwh", 
          "grid_region": "WECC",
          "facility": "West Coast Office"
        }
      ]
    }
  }'
```

**Response Example**:
```json
{
  "status": "success",
  "data": {
    "company": "Your Company Name",
    "reporting_year": 2024,
    "scope1_emissions": {
      "total_co2_tons": 2651.0,
      "breakdown": {
        "natural_gas": {
          "co2_tons": 2651.0,
          "emission_factor": 0.05302,
          "factor_source": "EPA"
        },
        "diesel": {
          "co2_tons": 102.4,
          "emission_factor": 0.01024,
          "factor_source": "EPA"
        }
      }
    },
    "scope2_emissions": {
      "total_co2_tons": 1663.75,
      "breakdown": {
        "electricity_rfc": {
          "co2_tons": 1127.5,
          "emission_factor": 0.000451,
          "factor_source": "EPA eGRID"
        },
        "electricity_wecc": {
          "co2_tons": 536.25,
          "emission_factor": 0.000447,
          "factor_source": "EPA eGRID"
        }
      }
    },
    "total_emissions": 4314.75,
    "calculation_id": "calc_2024_001",
    "timestamp": "2024-12-15T10:30:00Z"
  }
}
```

### Step 4: EPA Cross-Validation

Validate your calculations against EPA data:

```bash
curl -X POST "https://api.envoyou.com/v1/validation/epa" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "company": "Your Company Name",
    "calculation_id": "calc_2024_001",
    "facilities": [
      {
        "name": "Main Plant",
        "address": "123 Industrial Blvd, City, State",
        "naics_code": "325120"
      }
    ]
  }'
```

**Validation Response**:
```json
{
  "status": "success",
  "data": {
    "validation_result": {
      "status": "validated",
      "total_calculated": 4314.75,
      "epa_comparison": {
        "facilities_found": 1,
        "epa_reported_emissions": 4180.2,
        "deviation_percent": 3.2,
        "within_threshold": true,
        "threshold_percent": 10
      },
      "recommendations": [
        "Emissions within acceptable range compared to EPA data",
        "Consider reviewing Scope 2 calculations for West Coast facility"
      ],
      "flags": []
    },
    "validation_id": "val_2024_001"
  }
}
```

### Step 5: Generate SEC Filing Package

Create your SEC-ready filing package:

```bash
curl -X POST "https://api.envoyou.com/v1/export/sec/package" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "calculation_id": "calc_2024_001",
    "validation_id": "val_2024_001",
    "company_info": {
      "legal_name": "Your Company Name Inc.",
      "cik": "0001234567",
      "ticker": "YRCN",
      "fiscal_year_end": "2024-12-31"
    },
    "format_options": {
      "include_methodology": true,
      "include_audit_trail": true,
      "table_format": "10k_compliant"
    }
  }'
```

**Package Response**:
```json
{
  "status": "success",
  "data": {
    "package_id": "pkg_2024_001",
    "files": [
      {
        "filename": "sec_climate_disclosure_table.csv",
        "description": "10-K compliant emissions table",
        "type": "sec_table"
      },
      {
        "filename": "emissions_calculation_detail.json",
        "description": "Detailed calculation breakdown",
        "type": "calculation_data"
      },
      {
        "filename": "audit_trail.csv", 
        "description": "Complete audit trail",
        "type": "audit_data"
      },
      {
        "filename": "epa_validation_report.pdf",
        "description": "EPA cross-validation results",
        "type": "validation_report"
      }
    ],
    "download_url": "https://api.envoyou.com/downloads/pkg_2024_001.zip",
    "expires_at": "2024-12-22T10:45:00Z"
  }
}
```

## Best Practices

### Data Collection

1. **Standardize Units**: Use consistent units across all facilities
2. **Document Sources**: Keep records of all data sources
3. **Regular Updates**: Update calculations as new data becomes available
4. **Quality Control**: Implement data validation processes

### Calculation Management

1. **Version Control**: Track calculation versions and changes
2. **Backup Data**: Maintain backups of all input data
3. **Regular Validation**: Perform EPA validation regularly
4. **Audit Preparation**: Maintain detailed audit trails

### SEC Filing Preparation

1. **Early Preparation**: Start calculations well before filing deadlines
2. **Review Process**: Implement multi-level review processes
3. **Legal Review**: Have legal team review disclosures
4. **Backup Plans**: Prepare contingency plans for data issues

## Common Issues and Solutions

### Data Quality Issues

**Problem**: Inconsistent units across facilities
**Solution**: Use the `/v1/emissions/units` endpoint to standardize units

**Problem**: Missing emission factors
**Solution**: Use `/v1/emissions/factors` to get current EPA factors

### Validation Failures

**Problem**: High deviation from EPA data
**Solution**: Review input data and facility mappings

**Problem**: No EPA facilities found
**Solution**: Use `/v1/admin/mappings` to create facility mappings

### Filing Format Issues

**Problem**: Incorrect table format
**Solution**: Use `table_format: "10k_compliant"` in export options

## Audit Trail Requirements

The API automatically maintains audit trails including:

- **Input Data**: All calculation inputs with timestamps
- **Emission Factors**: Factors used with sources and versions
- **Methodology**: Calculation methods and formulas applied
- **Validation Results**: EPA comparison results and flags
- **User Actions**: Who performed calculations and when

Access audit trails:

```bash
curl -X GET "https://api.envoyou.com/v1/audit?company=Your%20Company%20Name&start_date=2024-01-01&end_date=2024-12-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Compliance Checklist

### Pre-Calculation
- [ ] Gather all Scope 1 fuel consumption data
- [ ] Collect all Scope 2 electricity consumption data
- [ ] Identify grid regions for all facilities
- [ ] Verify data quality and completeness

### Calculation Phase
- [ ] Use current EPA emission factors
- [ ] Calculate Scope 1 emissions by fuel type
- [ ] Calculate Scope 2 emissions by grid region
- [ ] Document all assumptions and methodologies

### Validation Phase
- [ ] Perform EPA cross-validation
- [ ] Review deviation analysis
- [ ] Address any validation flags
- [ ] Document validation results

### Filing Preparation
- [ ] Generate SEC-compliant tables
- [ ] Prepare audit trail documentation
- [ ] Review all calculations and assumptions
- [ ] Obtain necessary approvals

### Post-Filing
- [ ] Archive all calculation data
- [ ] Maintain audit trails per retention requirements
- [ ] Plan for next year's reporting
- [ ] Document lessons learned

## Support and Resources

### Technical Support
- **Email**: support@envoyou.com
- **Documentation**: [docs.envoyou.com](https://docs.envoyou.com)
- **API Status**: [status.envoyou.com](https://status.envoyou.com)

### Compliance Resources
- **SEC Climate Disclosure Rules**: [SEC.gov](https://www.sec.gov)
- **EPA Emission Factors**: [EPA.gov](https://www.epa.gov)
- **GHG Protocol**: [ghgprotocol.org](https://ghgprotocol.org)

### Professional Services
For complex implementations or custom requirements:
- **Compliance Consulting**: Available for Enterprise customers
- **Custom Integration**: API customization and integration support
- **Audit Support**: Assistance with regulatory audits

---

**Ready to get started?** Contact our team at [support@envoyou.com](mailto:support@envoyou.com) for personalized guidance on your SEC compliance implementation.
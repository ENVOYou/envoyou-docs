---
sidebar_position: 5
---

# Guides

Comprehensive guides and tutorials for implementing SEC Climate Disclosure compliance with Envoyou SEC API.

## Getting Started Guides

### [SEC Compliance Guide](./sec-compliance-guide.md)
Complete step-by-step guide for implementing SEC Climate Disclosure requirements using our API. Covers data collection, calculations, EPA validation, and SEC filing preparation.

## Integration Guides

### Python Integration
```python
import requests
import os

class EnvoyouSECClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.envoyou.com"
        self.headers = {
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        }
    
    def calculate_emissions(self, company_data):
        """Calculate Scope 1 & 2 emissions"""
        response = requests.post(
            f"{self.base_url}/v1/emissions/calculate",
            headers=self.headers,
            json=company_data
        )
        return response.json()
    
    def validate_with_epa(self, calculation_data):
        """Cross-validate against EPA data"""
        response = requests.post(
            f"{self.base_url}/v1/validation/epa",
            headers=self.headers,
            json=calculation_data
        )
        return response.json()
    
    def generate_sec_package(self, package_data):
        """Generate SEC filing package"""
        response = requests.post(
            f"{self.base_url}/v1/export/sec/package",
            headers=self.headers,
            json=package_data
        )
        return response.json()

# Usage example
client = EnvoyouSECClient(os.getenv("ENVOYOU_API_KEY"))

# Calculate emissions
emissions_data = {
    "company": "Demo Corp",
    "scope1": {"fuel_type": "natural_gas", "amount": 1000, "unit": "mmbtu"},
    "scope2": {"kwh": 500000, "grid_region": "RFC"}
}

result = client.calculate_emissions(emissions_data)
print(f"Total emissions: {result['data']['total_emissions']} tons CO2")
```

### JavaScript/Node.js Integration
```javascript
class EnvoyouSECClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.envoyou.com';
        this.headers = {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        };
    }

    async calculateEmissions(companyData) {
        const response = await fetch(`${this.baseUrl}/v1/emissions/calculate`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(companyData)
        });
        return response.json();
    }

    async validateWithEPA(calculationData) {
        const response = await fetch(`${this.baseUrl}/v1/validation/epa`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(calculationData)
        });
        return response.json();
    }

    async generateSECPackage(packageData) {
        const response = await fetch(`${this.baseUrl}/v1/export/sec/package`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(packageData)
        });
        return response.json();
    }
}

// Usage example
const client = new EnvoyouSECClient(process.env.ENVOYOU_API_KEY);

const emissionsData = {
    company: "Demo Corp",
    scope1: { fuel_type: "natural_gas", amount: 1000, unit: "mmbtu" },
    scope2: { kwh: 500000, grid_region: "RFC" }
};

client.calculateEmissions(emissionsData)
    .then(result => {
        console.log(`Total emissions: ${result.data.total_emissions} tons CO2`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Advanced Topics

### Error Handling Best Practices

```python
def handle_api_response(response):
    """Handle API responses with proper error checking"""
    if response.status_code == 200:
        data = response.json()
        if data.get('status') == 'success':
            return data['data']
        else:
            raise Exception(f"API Error: {data.get('error', 'Unknown error')}")
    elif response.status_code == 401:
        raise Exception("Authentication failed - check your API key")
    elif response.status_code == 403:
        raise Exception("Insufficient permissions for this endpoint")
    elif response.status_code == 429:
        raise Exception("Rate limit exceeded - please wait before retrying")
    else:
        raise Exception(f"HTTP Error {response.status_code}: {response.text}")

# Usage
try:
    result = client.calculate_emissions(emissions_data)
    print("Calculation successful:", result)
except Exception as e:
    print("Error occurred:", str(e))
```

### Batch Processing

```python
def process_multiple_facilities(client, facilities_data):
    """Process emissions for multiple facilities"""
    results = []
    
    for facility in facilities_data:
        try:
            # Calculate emissions for each facility
            result = client.calculate_emissions(facility)
            
            # Validate against EPA
            validation = client.validate_with_epa(facility)
            
            results.append({
                'facility': facility['company'],
                'emissions': result,
                'validation': validation
            })
            
            # Rate limiting - wait between requests
            time.sleep(1)
            
        except Exception as e:
            print(f"Error processing {facility['company']}: {e}")
            continue
    
    return results
```

### Audit Trail Management

```python
def get_audit_trail(client, company, start_date, end_date):
    """Retrieve audit trail for compliance documentation"""
    headers = {
        "Authorization": f"Bearer {client.jwt_token}",
        "Content-Type": "application/json"
    }
    
    params = {
        "company": company,
        "start_date": start_date,
        "end_date": end_date,
        "limit": 100
    }
    
    response = requests.get(
        f"{client.base_url}/v1/audit",
        headers=headers,
        params=params
    )
    
    return handle_api_response(response)
```

## Troubleshooting

### Common Issues

**Issue**: "Invalid API key" error
**Solution**: Verify your API key is correct and has proper permissions

**Issue**: Rate limit exceeded
**Solution**: Implement exponential backoff and respect rate limits

**Issue**: EPA validation fails
**Solution**: Check facility mappings and ensure accurate company information

**Issue**: SEC export format incorrect
**Solution**: Use `table_format: "10k_compliant"` in export requests

### Debug Mode

Enable debug logging to troubleshoot issues:

```python
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def debug_api_call(response):
    logger.debug(f"Status Code: {response.status_code}")
    logger.debug(f"Headers: {response.headers}")
    logger.debug(f"Response: {response.text}")
```

## Best Practices

### Security
- Store API keys in environment variables
- Use HTTPS for all API calls
- Rotate API keys regularly
- Monitor API usage for anomalies

### Performance
- Implement proper error handling
- Use appropriate rate limiting
- Cache emission factors when possible
- Batch requests when feasible

### Compliance
- Maintain detailed audit trails
- Document all assumptions and methodologies
- Regular validation against EPA data
- Keep backups of all calculation data

## Support Resources

### Documentation
- [API Reference](../api/api-reference.md)
- [Authentication Guide](../api/authentication.md)
- [FAQ](../faq.md)

### Community
- [GitHub Issues](https://github.com/ENVOYou/envoyou-sec-api/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/envoyou)

### Professional Support
- **Email**: support@envoyou.com
- **Enterprise Support**: Available for Enterprise customers
- **Consulting Services**: Custom implementation assistance

---

**Need help with implementation?** Our team is here to help you succeed with SEC Climate Disclosure compliance.
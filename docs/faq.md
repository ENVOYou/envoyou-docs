---
sidebar_position: 6
---

# Frequently Asked Questions

## General Questions

### What is Envoyou SEC API?
Envoyou SEC API is a specialized backend service designed for SEC Climate Disclosure compliance. It provides auditable greenhouse gas (GHG) calculation, EPA cross-validation, and SEC-ready export capabilities for public companies required to submit climate disclosures.

### Who needs SEC Climate Disclosure compliance?
Public companies are required to report Scope 1 and Scope 2 greenhouse gas emissions as part of SEC Climate Disclosure rules. This includes companies listed on major exchanges that meet specific criteria.

### What are Scope 1 and Scope 2 emissions?
- **Scope 1**: Direct emissions from sources owned or controlled by the company (e.g., fuel combustion, company vehicles)
- **Scope 2**: Indirect emissions from purchased electricity, steam, heating, and cooling

## Technical Questions

### How do I get started with the API?
1. Register at [app.envoyou.com](https://app.envoyou.com)
2. Generate an API key in your dashboard
3. Start with the `/v1/emissions/calculate` endpoint
4. Use EPA validation and SEC export features as needed

### What authentication methods are supported?
- **API Key**: For most endpoints (`X-API-Key` header)
- **JWT Bearer Token**: For user-specific and admin operations (`Authorization: Bearer` header)

### What emission factors does the API use?
The API uses EPA-approved emission factors from official sources including:
- EPA emission factors for fuel combustion
- EPA eGRID data for electricity emissions
- EDGAR global emissions database for reference

### How accurate are the calculations?
Our calculations use official EPA emission factors and are designed to meet SEC compliance requirements. All calculations include complete audit trails for regulatory review.

## Compliance Questions

### Does this meet SEC Climate Disclosure requirements?
Yes, the API is specifically designed to meet SEC Climate Disclosure requirements for Scope 1 and Scope 2 emissions reporting. All calculations include forensic-grade audit trails.

### What is EPA cross-validation?
EPA cross-validation compares your calculated emissions against public EPA facility data to detect potential anomalies or discrepancies before filing with the SEC.

### What formats are supported for SEC filing?
The API generates SEC-ready outputs including:
- JSON format for data integration
- CSV format for spreadsheet analysis
- 10-K friendly tables for direct regulatory submission

### How long are audit trails retained?
Audit trails are retained according to SEC requirements and your subscription tier. Premium and Enterprise tiers include extended retention periods.

## API Usage Questions

### What are the rate limits?
Rate limits vary by subscription tier:
- **Basic**: 30 requests per minute
- **Premium**: 100 requests per minute  
- **Enterprise**: 500 requests per minute

### Can I test the API before purchasing?
Yes, we offer demo API keys for testing. Contact support or use the demo key generator in the API documentation.

### What programming languages are supported?
The API is language-agnostic and works with any language that can make HTTP requests. We provide examples for:
- Python
- JavaScript/Node.js
- cURL
- Additional examples available in documentation

### How do I handle errors?
All API responses follow a consistent format:
```json
{
  "status": "success|error",
  "data": {...},
  "error": "Error description (if applicable)"
}
```

Check the `status` field and handle errors appropriately in your application.

## Data Questions

### What fuel types are supported?
Currently supported fuel types include:
- Natural gas
- Coal
- Oil/petroleum products
- Propane
- Additional fuel types available upon request

### What electricity grid regions are supported?
We support all major US electricity grid regions:
- RFC (ReliabilityFirst Corporation)
- WECC (Western Electricity Coordinating Council)
- TRE (Texas Regional Entity)
- SERC (SERC Reliability Corporation)
- And others as defined by EPA eGRID

### Can I upload my own emission factors?
Enterprise customers can work with our team to incorporate custom emission factors while maintaining SEC compliance requirements.

## Billing Questions

### What subscription tiers are available?
- **Basic**: Free tier with limited requests
- **Premium**: Full API access with higher limits
- **Enterprise**: Custom solutions with dedicated support

### Is there a free trial?
Yes, all new accounts include access to the Basic tier. Premium features can be tested with demo API keys.

### How is usage calculated?
Usage is calculated based on API requests per month. Each calculation, validation, or export request counts toward your monthly quota.

## Support Questions

### How do I get technical support?
- **Documentation**: Comprehensive guides and examples
- **Email Support**: support@envoyou.com
- **Enterprise Support**: Dedicated support channels for Enterprise customers

### Can you help with SEC compliance implementation?
Yes, our team can provide guidance on implementing SEC Climate Disclosure requirements using our API. Contact us for consultation services.

### Do you provide audit support?
Enterprise customers receive audit support including documentation review and regulatory compliance guidance.

## Security Questions

### How is my data protected?
- All data transmission uses HTTPS encryption
- API keys are securely hashed and stored
- Audit trails are encrypted at rest
- SOC 2 compliance for Enterprise customers

### Who has access to my calculation data?
Only you and authorized users in your organization have access to your calculation data. Envoyou staff cannot access your data without explicit permission.

### Is the API GDPR compliant?
Yes, we follow GDPR requirements for data protection and privacy. Users can request data deletion and export as needed.

## Integration Questions

### Can I integrate with existing ERP systems?
Yes, the API is designed for easy integration with existing systems. We provide webhooks and bulk processing capabilities for Enterprise customers.

### Do you offer SDKs or libraries?
We provide code examples and are developing official SDKs for popular programming languages. Contact us for specific SDK requirements.

### Can I white-label the solution?
Enterprise customers can discuss white-label and custom branding options with our team.

---

**Still have questions?** Contact our support team at [support@envoyou.com](mailto:support@envoyou.com) or visit our [support portal](https://app.envoyou.com/support).
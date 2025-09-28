---
sidebar_position: 1
---

# Welcome to Envoyou SEC API Documentation

Welcome to the comprehensive documentation for **Envoyou SEC API** - your specialized solution for SEC Climate Disclosure compliance.

## 🚀 What is Envoyou SEC API?

Envoyou SEC API is a focused backend service designed specifically for **SEC Climate Disclosure compliance**. It provides auditable greenhouse gas (GHG) calculation, validation, and report export features tailored for public companies required to submit climate disclosures.

### Key Features

- **GHG Emissions Calculator**: Scope 1 & 2 calculation with forensic-grade traceability
- **EPA Cross-Validation**: Automatic comparison against public EPA datasets
- **SEC Export Package**: Generate complete SEC filing packages (10-K friendly)
- **Audit Trail**: Store inputs, calculation versions, factor sources, and timestamps
- **Authentication & RBAC**: Supabase JWT integration with role-based access control
- **Production Ready**: CI/CD, versioned migrations, and comprehensive testing

## 📋 Quick Start

1. **Sign Up**: Create your account at [app.envoyou.com](https://app.envoyou.com)
1. **Get API Key**: Generate your API key in the developer dashboard
1. **Calculate Emissions**: Start with our emissions calculation endpoint

```bash
curl -X POST "https://api.envoyou.com/v1/emissions/calculate" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "company": "Demo Corp",
    "scope1": {"fuel_type": "natural_gas", "amount": 1000, "unit": "mmbtu"},
    "scope2": {"kwh": 500000, "grid_region": "RFC"}
  }'
```

## 📚 Documentation Structure

- **[Introduction](./introduction.md)**: Learn about SEC Climate Disclosure requirements
- **[Getting Started](./getting-started.md)**: Step-by-step guide to get up and running
- **[Authentication](./api/authentication.md)**: Understand our security and access control
- **[API Reference](./api/api-reference.md)**: Complete endpoint documentation
- **[Guides](/docs/guides/)**: SEC compliance tutorials and integration examples
- **[FAQ](./faq.md)**: Common questions and troubleshooting

## 🔗 Useful Links

- **Interactive API Docs**: [api.envoyou.com/docs](https://api.envoyou.com/docs)
- **Web Application**: [app.envoyou.com](https://app.envoyou.com)
- **Support**: [support@envoyou.com](mailto:support@envoyou.com)

## 🎯 Use Cases

### For Public Companies
Meet SEC Climate Disclosure requirements with auditable Scope 1 & 2 emissions calculations.

### For ESG Consultants
Provide clients with SEC-compliant emissions reporting and validation services.

### For Auditors
Access forensic-grade audit trails for emissions calculation verification.

### For Developers
Build SEC compliance applications with reliable, standardized emissions APIs.

---

**Ready to get started?** Head over to our [Getting Started](./getting-started.md) guide!

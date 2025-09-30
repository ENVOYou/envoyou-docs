import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
export default function Home() {
  return (
    <Layout title="Envoyou Docs" description="Documentation for the Envoyou SEC Climate Disclosure Compliance API">
      <main style={{maxWidth: 820, margin: '0 auto', padding: '3rem 1.25rem'}}>
        <h1>Envoyou SEC Compliance Documentation</h1>
        <p>Welcome to the documentation portal for the Envoyou SEC Climate Disclosure compliance platform. Jump into the core resources below:</p>
        <ul>
          <li><Link to="/docs/introduction">Platform Introduction</Link></li>
          <li><a href="https://api.envoyou.com/docs" target="_blank" rel="noreferrer">Interactive API Documentation</a></li>
          <li><Link to="/docs/guides/user-applications">Application Patterns</Link></li>
        </ul>
        <p>Looking for real-time interactive testing? Visit our <a href="https://api.envoyou.com/docs" target="_blank" rel="noreferrer">Interactive API Console</a>.</p>
      </main>
    </Layout>
  );
}

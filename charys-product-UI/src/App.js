import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import api from './api';
import './App.css';

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await api.postAggregate(payload);
      setResult(res);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Product Aggregate Creator</h1>
        <p>Fill the form to create product + packs payload and submit to backend.</p>
      </header>

      <main>
        <ProductForm onSubmit={handleSubmit} submitting={loading} />
        <section className="response">
          {loading && <div className="info">Submitting…</div>}
          {result && (
            <div className="success">
              <h3>Success</h3>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
          {error && (
            <div className="error">
              <h3>Error</h3>
              <pre>{error}</pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
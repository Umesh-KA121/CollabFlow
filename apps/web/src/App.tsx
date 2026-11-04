import ApiStatus from './components/common/ApiStatus';

function App() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>CollabFlow</h1>
        <p>Multi-Tenant Team Collaboration Platform</p>
      </header>

      <section className="integration-section">
        <h2>System Integration</h2>
        <p>Verify that the frontend, backend and infrastructure are communicating correctly.</p>

        <ApiStatus />
      </section>
    </main>
  );
}

export default App;

import React from 'react';

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null, errorInfo: React.ErrorInfo | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>Algo deu errado (Crash no React):</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Ver detalhes do erro</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
          <button 
            onClick={() => { localStorage.removeItem('drinkeria_leads'); window.location.href = '/'; }}
            style={{ marginTop: '20px', padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Limpar Dados e Voltar ao Início
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

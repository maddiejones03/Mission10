import React from 'react';
import Header from './components/Header';
import BowlersTable from './components/BowlersTable';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Header />
      <BowlersTable />
    </div>
  );
}

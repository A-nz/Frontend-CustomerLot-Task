import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { CustomerTable } from './components/CustomerTable.tsx';

function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <CustomerTable />
    </Theme>
  );
}

export default App;

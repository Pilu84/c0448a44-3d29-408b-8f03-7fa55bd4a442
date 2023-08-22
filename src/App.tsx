import { ThemeProvider } from '@mui/material';
import React from 'react';
import { BaseListContainer } from './components/baseList/BaseListContainer';
import { HeaderNav } from './components/nav/headerNav';
import styles from './styles/base/app.less';
import { NTheme } from './styles/theme/NTheme';


function App() {
  return (
    <ThemeProvider theme={NTheme}>
      <div>
        <header className={styles.Appheader}>
          <HeaderNav />
        </header>
        <div className={styles.appBody}>
          <BaseListContainer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { AppProvider } from './context/appContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>
);

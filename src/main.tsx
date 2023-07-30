import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import App from './App';

const rootHTML = document.getElementById('root') as HTMLElement
const rootReact = ReactDOM.createRoot(rootHTML);

rootReact.render(
    <React.StrictMode >
        <App/>
    </React.StrictMode>
);

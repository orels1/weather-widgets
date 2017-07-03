import React from 'react';
import { render } from 'react-dom';
import './sass/styles.sass';
import './sass/embed.sass';

import Routes from './router';

render(<Routes />, document.getElementById('app'));
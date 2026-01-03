/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import { Route, Router } from '@solidjs/router'
import Home from './components/pages/Home.tsx'

const root = document.getElementById('root')

// render(() => <App />, root!)
render(() => (
    <Router root={App}>
        <Route path="/" component={Home} />
    </Router>
    ), root!
)

import './App.css';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import RoutesComponent from './components/routesComponent/roures';

function App() {
  return (
    <div data-testid="">
      <ErrorBoundary>
        <HashRouter>
          <RoutesComponent />
        </HashRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;

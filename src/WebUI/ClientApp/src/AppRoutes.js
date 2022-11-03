import { Issues } from "./pages/Issues";
import { Projects } from './pages/Projects';

const AppRoutes = [
  {
    index: true,
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/issues',
    element: <Issues />
  }
];

export default AppRoutes;

import { Issues } from "./pages/Issues/Issues";
import { Projects } from './pages/Projects/Projects';

const AppRoutes = [
  {
    index: true,
    element: <Projects />
  },
  {
    path: '/issues',
    element: <Issues />
  }
];

export default AppRoutes;

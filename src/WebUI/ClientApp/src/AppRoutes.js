import Issues from "pages/Issues";
import Projects from 'pages/Projects';

const AppRoutes = [
  {
    index: true,
    path: '/projects',
    name: 'Projects',
    element: <Projects />
  },
  {
    path: '/issues',
    name: 'Issues',
    element: <Issues />
  }
];

export default AppRoutes;

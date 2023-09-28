import { useRoutes } from 'react-router-dom';
import Details from './components/content/details/Details';
import Main from './components/main/Main';
import ErrorPage from './components/error/ErrorPage';

export const AppRoutes = (props) => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Main {...props} />
    },
    {
      path: '/:id/:name/details',
      element: <Details {...props} />
    },
    {
      path: '*',
      element: <ErrorPage clearState={() => {}} />
    }
  ]);

  return elements;
};

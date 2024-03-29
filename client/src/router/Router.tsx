import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { PATH } from '@constants/path';
import MainPage from '@pages/HomePage/HomePage';
import ResultPage from '@pages/ResultPage/ResultPage';
import GuidePage from '@pages/GuidePage/GuidePage';
import TermsOfUsePage from '@pages/TermsOfUsePage/TermsOfUsePage';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import { Suspense } from 'react';
import ResultPageSkeleton from '@pages/ResultPage/ResultPageSkeleton';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH.HOME,
          element: <MainPage />,
        },
        {
          path: PATH.GUIDE,
          element: <GuidePage />,
        },
        {
          path: PATH.RESULT,
          element: (
            <Suspense fallback={<ResultPageSkeleton />}>
              <ResultPage />
            </Suspense>
          ),
        },
        {
          path: PATH.TERMS_OF_USE,
          element: <TermsOfUsePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

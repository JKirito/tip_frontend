import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {(error as { statusText: string })?.statusText ||
              (error as { message: string }).message}
          </i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;

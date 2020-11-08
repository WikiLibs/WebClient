import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';

import Layout from "../Layout";

import NotFoundPage from '../../Pages/NotFoundPage';

const ErrorHandler = ({ children }) => {
  const location = useLocation();

  switch (get(location.state, 'statusCode')) {
    case 400:
        console.log("catch error code 400");
        return children;
    case 401:
        console.log("catch error code 401");
        return children;
    case 403:
        console.log("catch error code 403");
        return children;
    case 404:
      return <Layout component={NotFoundPage} />;
    case 409:
        console.log("catch error code 409");
        return children;
    case 500:
        console.log("catch error code 500");
        console.log("send error report to api");
        return children;
    default:
      return children
  }
};

export default ErrorHandler
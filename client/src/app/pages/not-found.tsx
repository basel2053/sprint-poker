import { Link } from '@/components/Link';

export const NotFound = () => {
  return (
    <div className="">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/home" replace>
        Go to Home
      </Link>
    </div>
  );
};

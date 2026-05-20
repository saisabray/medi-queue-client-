import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-bold ">404</div>
        <h1 className="text-2xl font-semibold mt-4">Page Not Found</h1>
        <p className="text-base-content/70 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link href="/">
            <button className="btn btn-primary">Go Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;

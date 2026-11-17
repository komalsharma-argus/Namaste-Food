import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="menu">
      <h1>Oops!</h1>
      <h3>{err?.status} {err?.statusText || "Something went wrong"}</h3>
      <Link to="/">Back to home</Link>
    </div>
  );
};
export default Error;
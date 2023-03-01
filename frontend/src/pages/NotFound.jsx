import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5em"></FaExclamationTriangle>
      <h1>404</h1>
      <div className="lead">Sorry this page does not exist </div>
      <Link to="/" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
}

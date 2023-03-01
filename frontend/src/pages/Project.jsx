import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

export default function Project() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!error && !loading && (
        <div className="mx-auto card p-5 w-75">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <div>{data.project.name}</div>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />
          <DeleteProjectButton projectId={data.project.id} />
          <EditProjectForm project={data.project} />
        </div>
      )}
    </>
  );
}

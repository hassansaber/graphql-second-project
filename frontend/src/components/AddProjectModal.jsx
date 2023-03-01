import { useState } from "react";
import { FaList } from "react-icons/fa";

import { GET_PROJECTS } from "../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../graphql/queries/clientQueries";
import { ADD_PROJECT } from "../graphql/mutations/projectMutation";

import { useMutation, useQuery } from "@apollo/client";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },

    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  //get clients for select
  const { error, loading, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("please fill in all fields");
    }

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return null;
  if (error) return `Something Went Wrong`;

  return (
    <>
      {!loading && !error && (
        <>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add Project</div>
            </div>
          </button>
          <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select onChange={(e) => setStatus(e.target.value)} id="status" value={status} className="form-select">
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">select client</option>
                        {data.clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

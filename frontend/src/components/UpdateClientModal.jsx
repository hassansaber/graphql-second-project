import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { GET_CLIENTS } from "../graphql/queries/clientQueries";
import { UPDATE_CLIENT } from "../graphql/mutations/clientMutations";
import { useMutation } from "@apollo/client";

export default function UpdateClientModal() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      id,
      name,
      email,
      phone,
    },
    // addClient => addClient in our mutation => name...
    update(cache, { data: { updateClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (id === "") return alert("please fill ID");
    if (name === "" && email === "" && phone === "") {
      return alert("please fill One of fields");
    }

    // TODO: write condition for update when others are empty
    updateClient(id, name, email, phone);

    setId("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <button type="button" className="btn btn-secondary m-lg-4" data-bs-toggle="modal" data-bs-target="#updateClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Update Client</div>
        </div>
      </button>
      <div className="modal fade" id="updateClientModal" aria-labelledby="updateClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateClientModalLabel">
                Update Client
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Id</label>
                  <input type="text" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button data-bs-dismiss="modal" type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

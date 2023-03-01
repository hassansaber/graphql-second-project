import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../graphql/queries/clientQueries";
import { GET_PROJECTS } from "../graphql/queries/projectQueries";

export default function ClientRow({ client }) {
  // DELETE Client
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // UPDATE PAGE PROBLEM
    // solution1
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // solution2
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((cli) => cli.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

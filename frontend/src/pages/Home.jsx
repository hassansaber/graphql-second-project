import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import UpdateClientModal from "../components/UpdateClientModal";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
      </div>
      <AddProjectModal />
      <UpdateClientModal />
      <Projects />
      <Clients />
    </>
  );
}

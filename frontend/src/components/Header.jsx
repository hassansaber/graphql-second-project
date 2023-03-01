import logo from "./assets/GraphQL_Logo.png";

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>Project MERN GraphQL</div>
          </div>
        </a>
      </div>
    </nav>
  );
}

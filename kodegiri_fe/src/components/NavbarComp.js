import { Navbar } from "react-bootstrap";

function NavbarComp() {
  return (
    <Navbar
      style={{ backgroundColor: "#427fbe" }}
      expand="lg"
      className="py-0 px-3"
    >
      <Navbar.Brand id="github" style={{ color: "white", fontSize: "1.8rem" }}>
        <span style={{ fontWeight: "bold" }}>GitHub</span> Jobs
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavbarComp;

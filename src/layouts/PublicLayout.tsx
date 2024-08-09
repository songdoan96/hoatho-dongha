import { Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../store/toastSlice";

function PublicLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container>
      <div className="grid grid-cols-4 gap-4">
        <Button variant="outlined" onClick={() => navigate("/chao-mung")}>
          Welcome
        </Button>
        <Button variant="outlined" onClick={() => dispatch(showToast({ message: "hello" }))}>
          CLick me
        </Button>

        <Button variant="outlined" onClick={() => navigate("/phu-lieu")}>
          PL
        </Button>
        <Button variant="outlined" onClick={() => navigate("/admin")}>
          Admin
        </Button>
      </div>
    </Container>
  );
}

export default PublicLayout;

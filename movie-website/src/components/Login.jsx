import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import InputField from "../utils/InputField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const LoginPage = ({setUsername}) => {
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (localUsername.trim() && localPassword.trim()) {
      if (
        localUsername.toLocaleLowerCase() === "ergjus" &&
        localPassword === "12345"
      ) {
        setUsername(localUsername); // Set the username in App
        navigate("/homepage"); // Navigate to the homepage
      } else {
        alert("Invalid username or password"); // Prompt for invalid credentials
      }
    } else {
      alert("Please enter both username and password"); // Prompt for missing fields
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <Card className="w-80">
        <CardContent className="card flex flex-col gap-5 items-center">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">IMDb's NextWatch</h1>
            <h3 className="text-slate-500 text-sm">
              Please log in using an existing account
            </h3>
          </div>

          <InputField
            label="Username"
            color="black"
            value={localUsername}
            onChange={(event) => setLocalUsername(event.target.value)}
            required
          />
          <InputField
            label="Password"
            color="black"
            type="password"
            value={localPassword}
            onChange={(event) => setLocalPassword(event.target.value)}
            required
          />
          <Button
            variant="contained"
            size="small"
            className="lighter"
            onClick={handleLogin}>
            Log In
          </Button>
        </CardContent>
      </Card>
      <p className="tracking-wide text-slate-500">For CIS5800</p>
    </div>
  );
};

export default LoginPage;

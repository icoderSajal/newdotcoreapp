import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";
import { useNavigate } from "react-router";

const getFreshModel = () => ({
  name: "",
  email: "",
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate())
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ participantId: res.data.participantId });
          alert("User Login Successfully !!!");
          setLoading(false);
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name != "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

  return (
    <>
      <Center>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ my: 3 }}>
              Quiz App
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "90%",
                },
              }}
            >
              <form noValidate autoComplete="off" onSubmit={login}>
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.name && { error: true, helperText: errors.name })}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: "90%" }}
                >
                  {loading ? "Processing..." : "Start"}
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
      {/* <div className="flex justify-center items-center px-8 py-2 gap-4">
        <div className="bg-red-200 px-4 py-2 rounded-lg">
          <h1 className="text-3xl font-bold uppercase text-center">Quiz App</h1>
          <div className="mt-4 flex flex-col gap-4">
            <input className="p-4 h-10 rounded-xl" />
            <input className="p-4 h-10 rounded-xl" />
            <button className="bg-red-600 before:h-10 rounded-xl px-4 py-2">
              Start
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

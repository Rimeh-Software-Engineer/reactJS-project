import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Text,
  useMantineTheme,
  Title,
  // Imported Text for error message display
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store the token
        localStorage.setItem("userToken", token);

        // Redirect to dashboard based on role
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          setError("Access denied. Admins only.");
        }
      } else {
        setError("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(
          `Login failed: ${error.response.data.message || error.message}`
        );
      } else {
        setError("Login failed. Please check your network and try again.");
      }
    }
  };

  return (
    <>
      <Title align="center" style={{ fontWeight: 700, marginTop: "2rem" }}>
        Welcome Admin To Discan
        <Text component="span" style={{ color: theme.colors.brand[0] }}>
          T
        </Text>
        ini Dashboard
      </Title>
      <Text align="center" color="dimmed" size="sm" mt={10}>
        Please sign in to your account
      </Text>

      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {error && (
            <Text color="red" align="center">
              {error}
            </Text>
          )}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            mt="md"
          />
          <Button
            fullWidth
            mt="xl"
            onClick={handleLogin}
            style={{ backgroundColor: theme.colors.brand[0] }}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default Login;

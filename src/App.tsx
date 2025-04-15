import { Routes, Route } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import HomeScreen from "./app/ui/screens";
import AdminLogin from "./app/ui/screens/adminLogin";


function App() {
  return (
    <Stack bg="#00476F" color="white" minH="100vh">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </Stack>
  );
}

export default App;

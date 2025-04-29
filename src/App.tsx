import { Routes, Route } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import HomeScreen from "./app/ui/screens";
import AdminLogin from "./app/ui/screens/adminLogin";
import AdminDashboard from "./app/ui/screens/adminDashboard";
import Dispenser from "./app/ui/screens/dispenser"
import DeskLogin from "./app/ui/screens/deskLogin";
import TV from "./app/ui/components/TV";
import AdminUsers from "./app/ui/screens/adminUsers";


function App() {
  return (
    <Stack bg="#00476F" color="white" minH="100vh">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/deskLogin" element={<DeskLogin/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/dispenser" element={<Dispenser/>}/>
        <Route path="/tv" element={<TV/>}/>
        <Route path="/adminUsers" element={<AdminUsers/>}/>
        
        
      </Routes>
    </Stack>
  );
}

export default App;

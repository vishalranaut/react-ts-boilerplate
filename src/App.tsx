import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page for the SafeYatri app
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-safety">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">SafeYatri</h1>
        <p className="text-xl opacity-90">Loading your smart travel safety companion...</p>
      </div>
    </div>
  );
};

export default Index;

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div>
      Home
    </div>
  );
}

export default Home;
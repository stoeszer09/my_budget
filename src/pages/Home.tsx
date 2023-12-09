import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect } from "react";

const backendURL = process.env.BACKEND_URL as string;

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0<User>();

  useEffect(() => {
    const fetchData = async () => {
      if(user?.nickname && user?.sub) {
        const response = await fetch('http://localhost:5001/users', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "name": user.nickname,
            "auth": user.sub,
          }),
        })
        const data = await response.json()
        console.log('response data: ', data)
      }
    }
    fetchData()
  }, [user])

  return (
    <div>
      Home
    </div>
  );
}

export default Home;
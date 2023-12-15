import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect } from "react";
import AddExpense from "../components/AddExpense";

const backendURL = process.env.REACT_APP_BACKEND_URL as string;

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0<User>();

  useEffect(() => {
    const fetchData = async () => {
      if(user?.nickname && user?.sub) {
        const response = await fetch(backendURL + '/users', {
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
      {user && 
      <AddExpense user={user} />
      }
    </div>
  );
}

export default Home;
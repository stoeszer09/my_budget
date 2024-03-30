import { useAuth0, User } from "@auth0/auth0-react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import AddExpense from "../components/AddExpense";

const backendURL = process.env.REACT_APP_BACKEND_URL as string;

type Expenses = {
  expense: number,
  categoryId: number,
  categoryBudget: number,
  categoryName: string
}

function Home() {
  const [expenses, setExpenses] = useState<Expenses[]>();
  const { user, isAuthenticated, isLoading } = useAuth0<User>();

  useEffect(() => {
    const postUser = async (nickname: string, auth: string) => {
        const response = await fetch(backendURL + '/users', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "name": nickname,
            "auth": auth,
          }),
        })
      }
    const fetchData = async (auth : string) => {
      const response = await fetch(backendURL + '/transactions/users/' + auth)
      const data = await response.json();
      console.log('the data: ', data.expenses)
      setExpenses([...data.expenses])
    }
    if(user?.nickname && user?.sub) {
      postUser(user.nickname, user.sub)
      fetchData(user.sub)
    }
  }, [user])

  return (
    <div>
      Home
      {user && <AddExpense user={user} />}
      <TableContainer component={Paper} sx={{ maxWidth: 1/2 }} >
        <Table sx={{ maxWidth: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Budgeted</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Difference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses && expenses.map((expense) => (
              <TableRow
                key={expense.categoryName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {expense.categoryName}
                </TableCell>
                <TableCell align="right">{expense.categoryBudget.toString()}</TableCell>
                <TableCell align="right">{expense.expense.toString()}</TableCell>
                <TableCell align="right">{(expense.categoryBudget - expense.expense)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
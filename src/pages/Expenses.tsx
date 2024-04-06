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
  category: string,
  notes: string,
  date: Date,
}

function Expenses() {
  const [expenses, setExpenses] = useState<Expenses[]>();
  const { user, isAuthenticated, isLoading } = useAuth0<User>();

  const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })

  useEffect(() => {
    const fetchData = async (auth : string) => {
      const response = await fetch(backendURL + '/transactions/users/' + auth)
      const data = await response.json();
      setExpenses([...data.expenses])
    }
    if(user?.nickname && user?.sub) {
      fetchData(user.sub)
    }
  }, [user])

  return (
    <div>
      Expenses
      {user && <AddExpense user={user} />}
      <TableContainer component={Paper} sx={{ maxWidth: 1/2 }} >
        <Table sx={{ maxWidth: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses && expenses.map((expense) => (
              <TableRow
                key={expense.categoryId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {expense.date.toString().substring(0, 10)}
                </TableCell>
                <TableCell align="right">{expense.category.toString()}</TableCell>
                <TableCell align="right">{expense.expense.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Expenses;
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAuth0, User } from "@auth0/auth0-react";
import { useState } from 'react';
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@mui/material';

const backend_URL = process.env.REACT_APP_BACKEND_URL as string

function Profile() {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(100);
  const { user, isAuthenticated, isLoading } = useAuth0<User>();
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  };
  
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBudget(parseInt(e.target.value));
  };
  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(backend_URL + '/users/monthly-budgets')
    try {
      const response = await fetch(backend_URL + '/users/monthly-budgets', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, budget, user }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {isAuthenticated && user && (
        <div>
          <h2>{user.nickname}</h2>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                onChange={handleNameChange}
                defaultValue={`${user.nickname}`}
                label="Name"
                variant="standard"
              />
              <br />
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                onChange={handleBudgetChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </Box>
            {user.nickname !== name || budget !== budget ? (
              <Button onClick={handleSubmit} sx={{ width: 25 }} variant="contained">Submit</Button>
            ) : (
              <Button onClick={handleSubmit} sx={{ width: 25 }} variant="outlined">Submit</Button>
            )}
          </FormControl>
          {budget}
        </div>
      )}
    </div>
  );
}

export default Profile;
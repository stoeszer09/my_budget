import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAuth0, User } from "@auth0/auth0-react";
import { useState } from 'react';

function Profile() {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('100');
  const { user, isAuthenticated, isLoading } = useAuth0<User>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  };
  
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBudget(e.target.value);
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Call the onUpdateProfile function with the updated data
  //   onUpdateProfile({ nickname, budget });
  // };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {isAuthenticated && user && (
        <div>
          <h2>{user.nickname}</h2>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" onChange={handleNameChange} defaultValue={`${user.nickname}`} label="Name" variant="standard" />
            <TextField id="standard-basic" onChange={handleBudgetChange} defaultValue={`${budget}`} label="Montly Budget" variant="standard" />
          </Box>
        </div>
      )}
    </div>
  );
}

export default Profile;
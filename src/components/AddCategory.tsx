import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { type User } from '@auth0/auth0-react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const backend_URL = process.env.REACT_APP_BACKEND_URL as string;

export default function AddCategory({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [amount, setAmount] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(parseInt(e.target.value));
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategoryName(e.target.value as string);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(backend_URL + '/users/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          category: categoryName,
          user: user,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      const data = await response.json();
      console.log('category: ', data);
      setOpen(false)
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Name"
                onChange={handleNameChange}
              />
            </Box>
          </FormControl>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                onChange={handleAmountChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

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
import { useState, useEffect } from 'react';
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

type Categories = {
  name: string,
}

const backend_URL = process.env.REACT_APP_BACKEND_URL as string;

export default function AddExpense({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [transactionDate, setTransactionDate] = useState<Dayjs | null>(
    dayjs('2022-04-17')
  );
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(0);
  const [categoriesList, setCategoriesList] = useState<Categories[]>([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    console.log(e.target.value)
    setCategory(e.target.value as string);
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(parseInt(e.target.value));
  };

  const handleNotesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNotes(e.target.value as string);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(backend_URL + '/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: transactionDate,
          notes: notes,
          amount: amount,
          category: category,
          user: user,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      const data = await response.json();
      console.log('transaction: ', data);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(backend_URL + '/users/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
      })
      const data = await response.json();
      console.log('category list response: ', data)
      setCategoriesList(data.categoryList);
    }
    fetchData();
  }, [user])

  return (
    <div>
      <Button onClick={handleOpen}>Add Expense</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categoriesList ? (categoriesList.map((category, indx) => {
                return (
                  <MenuItem value={`${category.name}`} key={indx}>{category.name}</MenuItem>
                )
              })) : ''}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date"
                  value={transactionDate}
                  onChange={(newValue) => setTransactionDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
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
                label="Notes"
                onChange={handleNotesChange}
                multiline
                maxRows={4}
              />
            </Box>
            <Button onClick={handleSubmit}>Submit</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

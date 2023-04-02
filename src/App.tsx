import React, { useState } from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { List, ListItem, ListItemText } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

function App() {
  const [todoList, setTodoList] = useState<string[]>(['1', '2', '3'])
  const [inputValue, setInputValue] = useState<string>('')

  const handleAddTodo = () => {
    setTodoList([...todoList, inputValue])
    setInputValue('')
  }

  return (
    <Container maxWidth="sm">
      <Typography sx={{ marginTop: 4, marginBottom: 4 }} variant="h1" align="center">To-do List</Typography>
      <Grid2 container spacing={2}>
        <Grid2 sm={10}>
          <TextField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
            }}
            label="New to-do"
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 sm={2}>
          <Button
            disabled={!inputValue.length}
            onClick={handleAddTodo}
            sx={{ height: 56 }}
            size="large"
            variant="outlined"
          >
            Add
          </Button>
        </Grid2>
      </Grid2>
      <Paper sx={{ marginTop: 4 }} elevation={3}>
        <List>
          {
            todoList.map(todo => (
              <ListItem key={todo}>
                <ListItemText primary={todo} />
              </ListItem>
            ))
          }
        </List>
      </Paper>
    </Container>
  )
}

export default App

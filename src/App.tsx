import React, { useState, useCallback } from 'react'
import { Box, Button, Checkbox, Container, Divider, ListItemButton, ListItemIcon, Paper, TextField, Typography } from '@mui/material'
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

type TTodoList = {
  id: number
  name: string
  checked: boolean
}

function App() {
  const [todoList, setTodoList] = useState<TTodoList[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const handleAddTodo = () => {
    setTodoList([...todoList, { id: todoList.length, name: inputValue, checked: false }])
    setInputValue('')
  }

  const handleCheck = useCallback((id: number,value: boolean) => () => {
    const newTodoList = todoList

    newTodoList.map(todo => {
      if (todo.id === id) return todo.checked = !value

      return false
    })

    return setTodoList([...newTodoList])
  }, [todoList])

  const renderList = () => {
    if (todoList.length) {
      return (
        todoList.filter(list => list.checked === false).map(({ id, name, checked }) => (
          <ListItem key={`${name}-${id}`}>
            <ListItemButton onClick={handleCheck(id, checked)}>
              <ListItemText primary={name} />
              <ListItemIcon>
                <Checkbox checked={checked} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))
      )
    }

     return (
      <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography align="center" variant="h5">Your to-do list are empty</Typography>
      </Box>
     )
  }

  const renderDoneList = () => {
    if (todoList.length) {
      return (
        <>
          <Divider />
          <ListSubheader>Done</ListSubheader>
          {todoList.filter(list => list.checked === true).map(({ id, name, checked }) => (
            <ListItem key={`${name}-${id}`}>
              <ListItemButton onClick={handleCheck(id, checked)}>
                <ListItemText sx={{ textDecoration: 'line-through', color: '#ccc' }} primary={name} />
                <ListItemIcon>
                  <Checkbox color='default' checked={checked} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </>
      )
    }
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
          { renderList() }
          { renderDoneList() }
        </List>
      </Paper>
    </Container>
  )
}

export default App

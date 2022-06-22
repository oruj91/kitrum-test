import React from 'react'
import {CssBaseline, Stack} from '@mui/material'
import {FormRegister} from './container/FormRegister'

export default function App() {
  return (
    <>
      <CssBaseline/>

      <Stack justifyContent="center" alignItems="center" height="100vh" bgcolor="lightgrey">
        <FormRegister/>
      </Stack>
    </>
  )
}

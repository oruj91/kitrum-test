import * as React from 'react'
import {Typography} from '@mui/material'
import {FieldError} from 'react-hook-form'

interface Props {
  errors: FieldError | undefined
}

export function FormError({errors}: Props) {
  return errors ? <Typography color="error">{errors.message}</Typography> : null
}
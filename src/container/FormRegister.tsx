import * as React from 'react'
import * as yup from 'yup'
import {format} from 'date-fns'
import {yupResolver} from '@hookform/resolvers/yup'
import {useSnackbar} from 'notistack'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {useForm, SubmitHandler} from 'react-hook-form'
import {
  Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormLabel, OutlinedInput, Stack,
} from '@mui/material'
import {FormError} from '../component/FormError'

type Inputs = {
  userName: string
  age: number
  agree: boolean
}

const schema = yup.object().shape({
  userName: yup.string().required().label('Username'),
  age: yup.number().required().min(18).label('Your age'),
  agree: yup.bool().oneOf([true], 'The terms and conditions must be accepted'),
})

export function FormRegister() {
  const {register, setValue, handleSubmit, formState: {errors}} = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const {enqueueSnackbar} = useSnackbar()

  const [datepicker, setDatepicker] = React.useState<Date | null>(null)

  const onSubmit: SubmitHandler<Inputs> = ({agree, ...validData}) => {
    const requestData = {
      ...validData,
      birthDay: format(datepicker as Date, 'yyyy-MM-dd'),
    }

    console.log('Data for POST: ', requestData)
    // TODO implement POST async action and if success show snackbar
    enqueueSnackbar('Congrats! You have registered successfully', {variant: 'success'})
  }

  return (
    <Card>
      <CardHeader title="Registration"/>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack width={300} spacing={2}>
            <FormControl>
              <FormLabel required>Username</FormLabel>
              <OutlinedInput {...register('userName')} placeholder="Type your name"/>
              <FormError errors={errors.userName}/>
            </FormControl>
            <FormControl>
              <FormLabel required>Birthday</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date desktop"
                  inputFormat="dd/MM/yyyy"
                  value={datepicker}
                  onChange={(newValue) => {
                    const thisYear = new Date().getFullYear()
                    const birthYear = datepicker?.getFullYear() || thisYear

                    setValue('age', thisYear - birthYear)
                    setDatepicker(newValue)
                  }}
                  renderInput={params => (
                    <OutlinedInput
                      inputRef={params.inputRef}
                      inputProps={params.inputProps}
                      endAdornment={params.InputProps?.endAdornment}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormError errors={errors.age}/>
            </FormControl>
            <FormControl>
              <FormLabel>Your age</FormLabel>
              <OutlinedInput {...register('age')} placeholder="Select your datepicker date" disabled/>
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Checkbox {...register('agree')}/>} label="I'm agree"/>
              <FormError errors={errors.agree}/>
            </FormControl>
            <FormControl>
              <Button type="submit" variant="contained" size="large" fullWidth>Sign up</Button>
            </FormControl>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}
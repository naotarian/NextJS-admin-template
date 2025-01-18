'use client'

import { useState } from 'react'

import { IoIosLogIn } from 'react-icons/io'

import Button from '@/component/Atoms/Button'

import { useAuth } from '@/hooks/auth'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import LoadingComponent from '@/component/Atoms/LoadingComponent'

const Form = () => {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/'
  })

  const [employeeNumber, setEmployeeNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('employeeNumber:', employeeNumber)
    console.log('Password:', password)

    await login({
      employee_number: employeeNumber,
      password,
      remember: false,
      setErrors,
      setStatus
    })
    setLoading(false)
  }

  return (
    <>
      {/* ログインフォーム */}
      <Paper
        elevation={4}
        sx={{
          maxWidth: '100%',
          mx: 'auto',
          mt: 8,
          p: 0,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f7f7f7)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}
      >
        {/* ヘッダー */}
        <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f7f9fc' }}>
          <Typography variant="h5" component="h1" fontWeight="bold">
            ログイン
          </Typography>
        </Box>
        <Divider />
        {/* 本体 */}
        <Box sx={{ p: 3 }}>
          {errors && (
            <Box sx={{ color: 'error.main', mb: 2 }}>
              {Object.entries(errors).map(([key, messages]) =>
                messages.map((msg, index) => (
                  <Typography key={`${key}-${index}`} variant="body2">
                    {msg}
                  </Typography>
                ))
              )}
            </Box>
          )}
          {status && (
            <Box sx={{ color: 'success.main', mb: 2 }}>
              <Typography variant="body2">{status}</Typography>
            </Box>
          )}
          <TextField
            label="従業員番号"
            type="text"
            value={employeeNumber}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^0-9]/g, '')
              if (inputValue.length <= 7) {
                setEmployeeNumber(inputValue)
              }
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            inputProps={{ maxLength: 7 }}
          />
          <TextField
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        </Box>
        <Divider />
        {/* フッター */}
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Button
            label="ログイン"
            type="submit"
            color="info"
            startIcon={<IoIosLogIn />}
            fontWeight={700}
            isLoading={!loading}
            onClick={handleSubmit}
          />
        </Box>
      </Paper>

      {/* リンク用のPaper */}
      <Paper
        elevation={4}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f7f7f7)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Button
          label="新規登録はこちら"
          type="button"
          variant="text"
          color="info"
          href="/employee/auth/register"
          startIcon={<IoIosLogIn />}
          fontWeight={700}
          onClick={handleSubmit}
        />
        <Button
          label="パスワードを忘れた方はこちら"
          type="button"
          variant="text"
          color="info"
          href="/employee/auth/forgot-password"
          startIcon={<IoIosLogIn />}
          fontWeight={700}
          onClick={handleSubmit}
        />
      </Paper>
    </>
  )
}

export default Form

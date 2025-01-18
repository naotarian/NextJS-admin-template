'use client'

import { useState } from 'react'

import { IoIosLogIn } from 'react-icons/io'

import Button from '@/component/Atoms/Button'

import { useAuth } from '@/hooks/auth'

const Form = () => {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })
  const [employeeNumber, setEmployeeNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // フォームデータをコンソールに表示
    console.log('employeeNumber:', employeeNumber)
    console.log('Password:', password)

    await login({
      employee_number: employeeNumber,
      password,
      remember: false,
      setErrors,
      setStatus,
    })
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      {errors && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {Object.entries(errors).map(([key, messages]) =>
            messages.map((msg, index) => <p key={`${key}-${index}`}>{msg}</p>)
          )}
        </div>
      )}
      {status && (
        <div style={{ color: 'green', marginTop: '10px' }}>{status}</div>
      )}
      <input
        type="text"
        placeholder="従業員番号"
        value={employeeNumber}
        onChange={(e) => {
          const inputValue = e.target.value.replace(/[^0-9]/g, '') // 数字以外を除去
          if (inputValue.length <= 7) {
            setEmployeeNumber(inputValue) // 最大7桁まで許可
          }
        }}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <Button
        label="ログイン"
        type="submit"
        color="success"
        startIcon={<IoIosLogIn />}
        fontWeight={700}
        isLoading={loading}
      />
    </form>
  )
}

export default Form

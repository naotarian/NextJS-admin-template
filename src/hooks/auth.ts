// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

// import { useParams} from 'next/navigation'
import useSWR from 'swr'

import axios from '@/lib/axios'
interface LoginParams {
  employee_number: string
  password: string
  remember: boolean
  setErrors: (errors: Record<string, string[]>) => void
  setStatus: (status: string | null) => void
}
interface UseAuthReturn {
  user: {
    id: string
    dental_office_id: string
    employee_number: string
    name: string
    email: string
    phone: string
    role: number
    is_active: boolean
  } | null // ユーザーの型を適切に定義
  // register: (params: any) => Promise<void>
  login: (params: LoginParams) => Promise<void>
  // loginAgency: (params: any) => Promise<void>
  // forgotPassword: (params: any) => Promise<void>
  // resetPassword: (params: any) => Promise<void>
  // resendEmailVerification: (params: { setStatus: (status: string) => void }) => void
  // changePassword: (params: any) => Promise<void>
  logout: () => Promise<void>
}
export const useAuth = ({
  middleware = 'guest',
  redirectIfAuthenticated
}: {
  middleware?: string
  redirectIfAuthenticated?: string
}): UseAuthReturn => {
  const router = useRouter()
  // const params = useParams()
  const searchParams = useSearchParams()

  const {
    data: user,
    error,
    mutate
  } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error
        if (error.response.status === 409) router.push('/auth/verify-email')
        // if (error.response.status === 409) router.push('/auth/verify-email')
      })
  )

  const csrf = async () => await axios.get('/sanctum/csrf-cookie')
  // const register = async ({ setErrors, ...props }) => {
  // 	await csrf()

  // 	setErrors([])

  // 	axios
  // 		.post('/admin/register', props)
  // 		.then(() => mutate())
  // 		.catch((error) => {
  // 			if (error.response.status !== 422) throw error

  // 			setErrors(error.response.data.errors)
  // 		})
  // }

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf()
    setErrors([])
    setStatus(null)

    try {
      console.log('uuuu')
      await axios.post('/login', props)
      const user = await mutate()
      if (user.role === 'admin') {
        // クエリパラメータからリダイレクト先を取得
        const redirectUrl = searchParams.get('redirect') || '/'
        router.push(redirectUrl)
      } else {
        router.push('/employee/dashboard')
      }
    } catch (error) {
      console.log(error)
      if (error.response.status !== 422) throw error
      console.log('error.response.data.errors:', error.response.data.errors)
      setErrors(error.response.data.errors)
    }
  }

  // const loginAgency = async ({ setErrors, setStatus, ...props }) => {
  // 	await csrf()
  // 	setErrors([])
  // 	setStatus(null)

  // 	try {
  // 		await axios.post('/login/agency', props)
  // 		await mutate()
  // 		// クエリパラメータからリダイレクト先を取得
  // 		const redirectUrl = searchParams.get('redirect') || '/'
  // 		router.push(redirectUrl)
  // 	} catch (error) {
  // 		if (error.response.status !== 422) throw error
  // 		setErrors(error.response.data.errors)
  // 	}
  // }

  // const forgotPassword = async ({ setErrors, setStatus, email }) => {
  // 	await csrf()

  // 	setErrors([])
  // 	setStatus(null)

  // 	axios
  // 		.post('/admin/forgot-password', { email })
  // 		.then((response) => setStatus(response.data.status))
  // 		.catch((error) => {
  // 			if (error.response.status !== 422) throw error

  // 			setErrors(error.response.data.errors)
  // 		})
  // }

  // const resetPassword = async ({ setErrors, setStatus, ...props }) => {
  // 	await csrf()

  // 	setErrors([])
  // 	setStatus(null)

  // 	axios
  // 		.post('/reset-password', { token: params.token, ...props })
  // 		.then(() => router.push('/auth/login'))
  // 		// .then((response) => router.push('/login?reset=' + btoa(response?.data?.status)))
  // 		.catch((error) => {
  // 			if (error.response?.status !== 422) throw error

  // 			setErrors(error.response.data.errors)
  // 		})
  // }

  // const resendEmailVerification = ({ setStatus }) => {
  // 	axios
  // 		.post('/admin/email/verification-notification')
  // 		.then((response) => setStatus(response.data.status))
  // }

  // const changePassword = async ({
  // 	current_password,
  // 	password,
  // 	password_confirmation,
  // 	setErrors,
  // 	setStatus,
  // }) => {
  // 	await csrf()

  // 	setErrors([])
  // 	setStatus(null)

  // 	try {
  // 		await axios.post('/password/change', {
  // 			current_password,
  // 			password,
  // 			password_confirmation,
  // 		})

  // 		setStatus('パスワードを変更しました')
  // 	} catch (error) {
  // 		if (error.response?.status === 422) {
  // 			setErrors(error.response.data.errors)
  // 		} else if (error.response?.data?.message) {
  // 			setErrors({
  // 				password: [error.response.data.message],
  // 			})
  // 		} else {
  // 			setErrors({
  // 				password: ['パスワードの変更に失敗しました'],
  // 			})
  // 		}
  // 	}
  // }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate())
    }
    window.location.pathname = '/employee/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    if (window.location.pathname === '/verify-email' && user?.email_verified_at) router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) {
      if (window.location.pathname !== '/password-change') {
        logout()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error])

  return {
    user,
    // register,
    login,
    // loginAgency,
    // forgotPassword,
    // resetPassword,
    // resendEmailVerification,
    // changePassword,
    logout
  }
}

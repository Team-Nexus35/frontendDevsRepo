import styles from './login.module.css'
import { useReducer } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import WhiteArrowRight from '../../assets/icons/whiteArrowRight'
import NewButton from '../../components/newButton/newButton'
import SeePassword from '../../assets/icons/seePassword'
import HidePassword from '../../assets/icons/hidePassword'


const LOGIN_URL = 'https://backend-production-aa3a.up.railway.app/api/auth/login'

const initialState = {
  email: '',
  password: '',
  showPassword: false,
  error: '',
  loading: false,
  success: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword }
    case 'SET_ERROR':
      return { ...state, error: action.value, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.value }
    case 'SET_SUCCESS':
      return { ...state, success: action.value, error: '' }
    default:
      return state
  }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (field) => (e) => {
    dispatch({ type: 'SET_FIELD', field, value: e.target.value })
    if (state.error) dispatch({ type: 'SET_ERROR', value: '' })
  }

  const handleSubmit = async () => {
    if (state.loading) return

    dispatch({ type: 'SET_ERROR', value: '' })

    const email = state.email.trim()
    const password = state.password.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !password) {
      dispatch({ type: 'SET_ERROR', value: 'Please enter your email and password.' })
      return
    }

    if (!emailRegex.test(email)) {
      dispatch({ type: 'SET_ERROR', value: 'Please enter a valid email address.' })
      return
    }

    if (password.length < 8) {
      dispatch({ type: 'SET_ERROR', value: 'Password must be at least 8 characters.' })
      return
    }

    dispatch({ type: 'SET_LOADING', value: true })

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      console.log('Login response:', data) 

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.')
      }

      // Backend returns { success, message, data: { token } }
      const token = data.data?.token || data.token || null
      const user = data.data?.user || data.user || {}

      if (!token) {
        throw new Error('Login failed. Please try again.')
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      dispatch({ type: 'SET_SUCCESS', value: 'You have logged in successfully.' })

      setTimeout(() => {
        navigate('/getStarted1')
      }, 1500)

    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: error.message || 'Something went wrong. Please try again.' })
    } finally {
      dispatch({ type: 'SET_LOADING', value: false })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.card}>

          <div>
            <h1 className={styles.cardTitle}>Log in</h1>
            <p className={styles.cardSubtitle}>
              Enter your details to access your account.
            </p>
          </div>

          {state.success && (
            <p className={styles.successMsg}>{state.success}</p>
          )}

          {state.error && (
            <p className={styles.errMsg}>{state.error}</p>
          )}

          <div className={styles.form} onKeyDown={handleKeyDown}>

            <div className={styles.field}>
              <label htmlFor="login-email" className={styles.label}>
                Email Address <span className={styles.req}>*</span>
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={state.email}
                onChange={handleChange('email')}
                autoComplete="email"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="login-password" className={styles.label}>
                Password <span className={styles.req}>*</span>
              </label>
              <div className={styles.pwWrapper}>
                <input
                  id="login-password"
                  name="password"
                  type={state.showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={state.password}
                  onChange={handleChange('password')}
                  minLength={8}
                  autoComplete="current-password"
                  className={`${styles.input} ${styles.inputPw}`}
                />
                <button
                  type="button"
                  className={styles.pwToggle}
                  onClick={() => dispatch({ type: 'TOGGLE_PASSWORD' })}
                  aria-label={state.showPassword ? 'Hide password' : 'Show password'}
                >
                  {state.showPassword
                    ? <HidePassword className={styles.pwIcon} />
                    : <SeePassword className={styles.pwIcon} />}
                </button>
              </div>
            </div>

            <NewButton
              text={state.loading ? 'Logging in…' : 'Login'}
              variant="filledBlue"
              Icon={!state.loading ? WhiteArrowRight : null}
              className={styles.submitBtn}
              disabled={state.loading}
              btnFunction={handleSubmit}
            />

          </div>

          <p className={styles.switchText}>
            Don't have an account?{' '}
            <NavLink to="/register" className={styles.switchLink}>Register</NavLink>
          </p>

        </div>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 FundMatch AI. All rights reserved.</span>
        <div className={styles.footerLinks}>
          <a href="/privacy">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}

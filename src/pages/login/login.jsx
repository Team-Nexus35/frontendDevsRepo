import styles from './login.module.css'
import { useReducer } from 'react'
import { NavLink } from 'react-router-dom'
import tempLogo from '../../assets/images/tempLogo.png'
import WhiteArrowRight from '../../assets/icons/whiteArrowRight'
import NewButton from '../../components/newButton/newButton'
import SeePassword from '../../assets/icons/seePassword'
import HidePassword from '../../assets/icons/hidePassword'
import { useNavigate } from 'react-router-dom'

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
    return { ...state, error: action.value }

    case 'SET_LOADING':
    return { ...state, loading: action.value }

    case 'SET_SUCCESS':
    return { ...state, success: action.value }

    default:
    return state
  }
}

function getStrength(pw) {
  if (!pw) return null
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const map = [
    { width: '25%', color: '#ef4444', label: 'Weak' },
    { width: '50%', color: '#f59e0b', label: 'Fair' },
    { width: '75%', color: '#3b82f6', label: 'Good' },
    { width: '100%', color: '#10b981', label: 'Strong' },
  ]
  return map[score - 1] || null
}

export default function LoginPage () {
  const navigate = useNavigate()    

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (field) => (e) => {
  dispatch({ type: 'SET_FIELD', field, value: e.target.value })

  if (state.loading) {
    dispatch({ type: 'SET_LOADING', value: false })
  }
}

  const handleSubmit = async () => {

//   e.preventDefault()

  if (state.loading) return

  dispatch({ type: 'SET_ERROR', value: '' })

  dispatch({ type: 'SET_LOADING', value: true })

  const email = state.email.trim()
  const password = state.password.trim()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || !password) {
    dispatch({
      type: 'SET_ERROR',
      value: 'Please enter your email and password.',
    })
    dispatch({ type: 'SET_LOADING', value: false })

    return
  }

  if (!emailRegex.test(email)) {
    dispatch({
      type: 'SET_ERROR',
      value: 'Please enter a valid email address.',
    })
    dispatch({ type: 'SET_LOADING', value: false })
    return
  }


  try {
    const response = await fetch(
      'http://localhost:5000/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    if (!data?.token) {
    throw new Error('Authentication failed')
    }

    if (data?.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    }  


    dispatch({
    type: 'SET_SUCCESS',
    value: 'Logged in successful',
    })

    setTimeout(() => {
    navigate('/getStarted1')
    }, 1500)

  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      value: error.message || 'Something went wrong',
    })
  } finally {
    dispatch({ type: 'SET_LOADING', value: false })
  }
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

          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.field}>
              <label htmlFor="reg-email" className={styles.label}>
                Email Address <span className={styles.req}>*</span>
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={state.email}
                onChange={handleChange('email')}
                required
                autoComplete="email"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="reg-password" className={styles.label}>
                Password <span className={styles.req}>*</span>
              </label>
              <div className={styles.pwWrapper}>
                <input
                  id="reg-password"
                  name="password"
                  type={state.showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={state.password}
                  onChange={handleChange('password')}
                  required
                  minLength={8}
                  autoComplete="new-password"
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
              text={state.loading ? 'Loading...' : 'Login'}
              variant="filledBlue"
              Icon={!state.loading ? WhiteArrowRight : null}
              className={styles.submitBtn}
              disabled={state.loading}
              btnFunction={handleSubmit}
            />

          </form>

          {state.error && (
            <p className={styles.errMsg}>{state.error}</p>
           )}

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

//confirm if token and user is to be saved to local storage
// confirm endpoint and info sent if it matches backend endpoint

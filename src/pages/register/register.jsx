

import { useReducer } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './register.module.css'
import tempLogo from '../../assets/images/tempLogo.png'
import WhiteArrowRight from '../../assets/icons/whiteArrowRight'
import NewButton from '../../components/newButton/newButton'
import SeePassword from '../../assets/icons/seePassword'
import HidePassword from '../../assets/icons/hidePassword'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  terms: false,
  showPassword: false,
  error: '',
  loading: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }

    case 'TOGGLE_TERMS':
      return { ...state, terms: !state.terms }

    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword }

    case 'SET_ERROR':
      return { ...state, error: action.value }

    case 'SET_LOADING':
      return { ...state, loading: action.value }

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

export default function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const navigate = useNavigate()

  const handleChange = (field) => (e) =>
    dispatch({ type: 'SET_FIELD', field, value: e.target.value })

const handleSubmit = async (e) => {

  e.preventDefault()

  if (state.loading) return

  dispatch({ type: 'SET_ERROR', value: '' })

  const name = state.name.trim()
  const email = state.email.trim()
  const password = state.password

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!name || !email || !password || !state.terms) {
    dispatch({
      type: 'SET_ERROR',
      value: 'Please fill in all required fields and accept the terms.',
    })
    return
  }

  if (!emailRegex.test(email)) {

    dispatch({

        type: 'SET_ERROR',
        value: 'Please enter a valid email address.',
    })
    
    return
    }

  dispatch({ type: 'SET_LOADING', value: true })

try {
  const response = await fetch(
    'http://localhost:5000/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed')
  }

  navigate('/login')

} catch (error) {
  dispatch({
    type: 'SET_ERROR',
    value: error.message || 'Something went wrong',
  })

} finally {
  dispatch({ type: 'SET_LOADING', value: false })
}

}

  const strength = getStrength(state.password)

  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <div className={styles.card}>

          <div>
            <h1 className={styles.cardTitle}>Create your account</h1>
            <p className={styles.cardSubtitle}>
              Get matched with grants and loans your business qualify for.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.field}>
              <label htmlFor="reg-name" className={styles.label}>
                Full Name <span className={styles.req}>*</span>
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                placeholder="e.g. John Doe"
                value={state.name}
                onChange={handleChange('name')}
                required
                autoComplete="name"
                className={styles.input}
              />
            </div>

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

              {strength && (
                <div className={styles.strengthWrap}>
                  <div className={styles.strengthTrack}>
                    <div
                      className={styles.strengthFill}
                      style={{ width: strength.width, background: strength.color }}
                    />
                  </div>
                  <span className={styles.strengthLabel} style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            <label htmlFor="reg-terms" className={styles.termsRow}>
              <input
                id="reg-terms"
                name="terms"
                type="checkbox"
                checked={state.terms}
                onChange={() => dispatch({ type: 'TOGGLE_TERMS' })}
                required
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxCustom} />
              <span className={styles.checkboxText}>
                I agree to the{' '}
                <span className={styles.termsLink}>Terms of Service</span>
                {' '}and{' '}
                <span className={styles.termsLink}>Privacy Policy</span>
              </span>
            </label>

            {state.error && (
            <p className={styles.errMsg}>
                {state.error}
            </p>
            )}


            <NewButton
                text={state.loading ? 'Creating...' : 'Create Account'}
                variant="filledBlue"
                Icon={!state.loading ? WhiteArrowRight : null}
                disabled={state.loading}
                className={styles.submitBtn}
                type='submit'
                loading={state.loading}
                
                
            />

          </form>

          <p className={styles.switchText}>
            Already have an account?{' '}
            <NavLink to="/login" className={styles.switchLink}>Log in</NavLink>
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
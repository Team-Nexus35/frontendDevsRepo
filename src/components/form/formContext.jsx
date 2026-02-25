import { createContext, useContext, useReducer } from 'react'

const initialState = {
  company_name: '',
  sector: '',
  nationality: '',
  business_stage: '',
  business_age_months: '',
  business_registered: false,   

  founder_age: '',
  founder_gender: '',
  employees: '',

  funding_need_usd: '',        
  annual_revenue_usd: '',

  innovation_level: '',
  has_prototype: false,
  targets_underserved: false,
}

function formReducer(state, action) {

  switch (action.type) {

    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }

    case 'RESET_FORM':
      return initialState

    default:
      return state
  }
}

const FormContext = createContext()

export function FormProvider({ children }) {

  const [formData, dispatch] = useReducer(formReducer, initialState)

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => useContext(FormContext)
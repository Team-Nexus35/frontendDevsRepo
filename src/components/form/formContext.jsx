import { createContext, useContext, useReducer } from 'react'

const initialState = {
  // Page 1
  company_name: '',
  sector: '',
  nationality: '',
  business_stage: '',
  business_age_months: '',
  business_registered: false,

  // Page 2
  founder_age: '',
  founder_gender: '',
  employees: '',

  // Page 3
  funding_need_usd: '',
  annual_revenue_usd: '',
  innovation_level: '',
  has_prototype: false,
  targets_underserved: false,

  // Page 4 (UI only)
  annualRevenue: '',
  currentProfitability: '',
  numberOfEmployees: '',

  // Page 5 (UI only)
  fundingAmountNeeded: '',
  fundingPurpose: {
    workingCapital: false,
    equipmentPurchase: false,
    inventory: false,
    businessExpansion: false,
    marketingSales: false,
    hiringTraining: false,
    technologySoftware: false,
    realEstateFacilities: false,
    researchDevelopment: false,
    debtRefinancing: false,
  },
  applicationReadiness: {
    businessPlan: false,
    financialStatements: false,
    bankAccount: false,
    collateral: false,
  },
}

function formReducer(state, action) {
  switch (action.type) {

    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }

    case 'UPDATE_CHECKBOX':
      return {
        ...state,
        [action.group]: {
          ...state[action.group],
          [action.field]: action.value,
        },
      }

    case 'LOAD_PROFILE':
      return { ...state, ...action.profile }

    case 'RESET_FORM':
      return initialState

    default:
      return state
  }
}

const FormContext = createContext()

export function FormProvider({ children }) {
  const [formData, dispatch] = useReducer(formReducer, initialState, () => {
    // On first mount, rehydrate from localStorage if a saved profile exists
    try {
      const saved = localStorage.getItem('readiness_profile')
      if (saved) {
        const profile = JSON.parse(saved)
        return { ...initialState, ...profile }
      }
    } catch {
      
    }
    return initialState
  })

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => useContext(FormContext)

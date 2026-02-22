
import { createContext, useContext, useReducer } from 'react'

const initialState = {

  businessName: '',
  industry: '',
  businessStage: '',

  legalStructure: '',
  yearEstablished: '',
  registrationNumber: '',

  country: '',
  stateRegion: '',
  city: '',

  annualRevenue: '',
  currentProfitability: '',
  numberOfEmployees: '',


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

  fundingAmountNeeded: '',

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
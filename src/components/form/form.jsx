import styles from './form.module.css'
import NewButton from '../newButton/newButton'
import tempLogo from '../../assets/images/tempLogo.png' 
import WhiteArrowRight from '../../assets/icons/whiteArrowRight'
import BlackArrowLeft from '../../assets/icons/blackArrowLeft'

export function Form ({
  currentStep,
  totalSteps='5',
  percentComplete,
  title,
  description,
  icon: Icon,
  onNext,
  onPrevious,
  nextText = 'Next Step',
  previousText = 'Previous',
  showPrevious = true,
  NextIcon,
  progressBar,
  children 
}) {


  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>

          <img src={tempLogo} className={styles.logoIcon} />

          <div>
            <h1 className={styles.title}>SME Business Questionnaire</h1>
            <p className={styles.subtitle}>Help us understand your business needs</p>
          </div>

      </div>

      <div className={styles.progressSection}>
          <span className={styles.stepText}>Step {currentStep} of {totalSteps}</span>
          <span className={styles.percentText}>{percentComplete}% Complete</span>
        </div>
        
        {progressBar}

      <div className={styles.card}>

        <div className={styles.cardHeader}>

          {Icon && (
            <div className={styles.iconWrapper}>
              <Icon className={styles.icon} />
            </div>
          )}

          <div>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.cardDescription}>{description}</p>
          </div>

        </div>

        <div className={styles.fields}>
          {children}
        </div>

      </div>

      <div className={styles.footer}>
        <NewButton text={previousText} variant='filledWhite' Icon1={BlackArrowLeft} />
        <NewButton text={nextText} variant='filledBlack' Icon={WhiteArrowRight} />      
      </div>

      <p className={styles.securityNote}>
        🔒 Your information is encrypted and secure. We'll never share your data without permission.
      </p>

    </div>
  )
}


export function TextFormField({
    label,
    id,
    placeholder,
    value,
    onChange,
    required = false,
    note,
  }) {

    return (

      <div className={styles.fieldWrapper}>

        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && " *"}
          </label>
        )}

        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={styles.input}
        />

        {note && <p className={styles.note}>{note}</p>}
      </div>
    );
}

export function SelectFormField({
  label,
  id,
  value,
  onChange,
  options = [],
  required = false,
  placeholder,    
  note,
}) {
  return (
    <div className={styles.fieldWrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && " *"}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.select}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}

export function ProgressBar({ percentComplete }) {
  return (
    <div className={styles.progressBarTrack}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${percentComplete}%` }}
      />
    </div>
  )
}

export function CheckboxGroup({ label, required, children }) {
    return (
        <div className={styles.fieldWrapper}>
            {label && (
                <span className={styles.label}>
                    {label}
                    {required && ' *'}
                </span>
            )}
            <div className={styles.checkboxGroupChildren}>
                {children}
            </div>
        </div>
    )
}

export function CheckboxFormField({ id, label, checked, onChange }) {
    return (
        <label htmlFor={id} className={styles.checkboxLabel}>
            <input
                id={id}
                type='checkbox'
                checked={checked}
                onChange={onChange}
                className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom} />
            <span className={styles.checkboxText}>{label}</span>
        </label>
    )
}
import styles from './newButton.module.css'

export default function Button({ 
  variant = 'filledBlue',  // 'filledBlue' | 'filledBlack' | 'filledWhite' | 'outline' | 'ghost'
  size = 'md',             // 'md' | 'sm'
  text, 
  Icon, 
  btnFunction, 
  disabled = false,
  className = '', 
  style,
  iconClassName = '',
  Icon1
}) {
  return (
    <button
      className={`${styles.btn} ${styles[variant] || ''} ${styles[size]} ${className}`}
      style={style}
      onClick={btnFunction}
      disabled={disabled}
    >
      {Icon1 && <Icon1 className={`${styles.icon} ${iconClassName}`} />}
      <span className={styles.text}>{text}</span>
      {Icon && <Icon className={`${styles.icon} ${iconClassName}`} />}
    </button>
  );
}
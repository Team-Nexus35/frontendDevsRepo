import styles from './card.module.css'

export default function Card(
    { icon, heading, pText, 
    iconStyle = styles.iconStyle,
    headingStyle = styles.headingStyle,
    pTextStyle = styles.pTextStyle, 
    cardWrapper=styles.wrapper 
    }) 
    
    {

    return (
        <div className={cardWrapper}>
            <img className={iconStyle} src={icon} />
            <h3 className={headingStyle}>{heading}</h3>
            <p className={pTextStyle}>{pText}</p>
        </div>
    )
}

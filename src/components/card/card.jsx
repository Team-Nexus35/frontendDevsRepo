import styles from './card.module.css'

// export default function Card(
//     { icon, heading, pText, 
//     iconStyle = styles.iconStyle,
//     headingStyle = styles.headingStyle,
//     pTextStyle = styles.pTextStyle, 
//     cardWrapper=styles.wrapper 
//     }) 
    
//     {

//     return (
//         <div className={cardWrapper}>
//             <img className={iconStyle} src={icon} />
//             <h3 className={headingStyle}>{heading}</h3>
//             <p className={pTextStyle}>{pText}</p>
//         </div>
//     )
// }


export default function Card({
    icon,
    heading,
    pText,
    className = "",
    iconClass = "",
    headingClass = "",
    textClass = ""
}) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {icon && (
                <img
                    className={`${styles.iconStyle} ${iconClass}`}
                    src={icon}
                    alt={heading || "card icon"}
                />
            )}

            {heading && (
                <h3 className={`${styles.headingStyle} ${headingClass}`}>
                    {heading}
                </h3>
            )}

            {pText && (
                <p className={`${styles.pTextStyle} ${textClass}`}>
                    {pText}
                </p>
            )}
        </div>
    )
}



import styles from './button.module.css'
import ArrowRight from '../../assets/icons/whiteArrowRight';

export default function Button(props) {
    const { variant, btnFunction, text, Icon } = props

  return (
    <button className={styles.btn} data-variant={variant} >
        <p>{text}</p>
        {Icon && <Icon className={styles.icon} />}

    </button>
  );
}



// Button VariantNames
// blueTextBtn
// linkBlackBtn
// heroSectionBtn
// whiteBtn
//blueLongBtn

//Icon is optional

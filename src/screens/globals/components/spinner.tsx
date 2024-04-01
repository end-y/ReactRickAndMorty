import { useTheme } from '../../../contexts/themes';
import styles from '../../../styles/component.module.css'; 

const LoadingSpinner = () => {
    const { colors } = useTheme()
    return (
        <div className={styles.cardSearchList} style={{border:`1.5px solid ${colors.borderColor}`}} >
            <div className={styles.loadingSpinnerContainer}>
                <div  className={styles.loadingSpinner}></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
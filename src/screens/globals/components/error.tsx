import { useTheme } from '../../../contexts/themes';
import styles from '../../../styles/component.module.css'; 

const ErrorComponent = () => {
    const { colors } = useTheme()
    return (
        <div className={styles.cardSearchList} style={{border:`1.5px solid ${colors.borderColor}`}} >
            An error occured
        </div>
    );
};

export default ErrorComponent;
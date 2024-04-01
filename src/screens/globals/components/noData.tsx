import { useTheme } from '../../../contexts/themes';
import styles from '../../../styles/component.module.css'; 

const NoData = () => {
    const { colors } = useTheme()
    return (
        <div className={styles.cardSearchList} style={{border:`1.5px solid ${colors.borderColor}`}} >
            Not found any data.
        </div>
    );
};

export default NoData;
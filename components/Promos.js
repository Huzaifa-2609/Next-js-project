import React from 'react';
import styles from './Promos.module.css';

const Promos = () => {
  return (
    <div className={styles.Wrapper}>
        <div className={styles.OfferCard}>
            <div className={styles.Title}>Yield earned</div>
            <div className={styles.Description}>Earn up CO 2.84% APY on your crypto</div>
            <div className={styles.Placeholder}/>
            <div className={styles.Additional} style={{ fontSize: '1.5rem' }}>$0.000066 <span>2.84% APY</span></div>
        </div>

        <div className={styles.OfferCard}>
            <div className={styles.Title}>Learn and Earn</div>
            <div className={styles.Description}>Earn up CO 2.84% APY on your crypto</div>
            <div className={styles.Placeholder}/>
            <div className={styles.Additional}style={{ color: '#8d1212', cursor: 'pointer' }}>Verify Identity</div>
        </div>
    </div>
  )
}

export default Promos;
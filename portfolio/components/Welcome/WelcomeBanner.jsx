import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'
import styles from './styles.module.css'

const Trail = ({ open, children }) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 1000, friction: 200 },
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? 110 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })
    return (
        <div>
            {trail.map(({ height, ...style }, index) => (
                <a.div key={index} className={styles.trailsText} style={style}>
                    <a.div style={{ height }}>{items[index]}</a.div>
                </a.div>
            ))}
        </div>
    )
}

export const WelcomeBanner = ( {username, profileImg} ) => {
    const [open, set] = useState(true)
    return (
        <div style={{display:"flex", justifyContent:"center", placeItems:"center",width:'100vw', height:'100vh'}}
            className={styles.container} onClick={() => set(state => !state)}>
            <Trail open={open}>
                <span style={{fontSize: '4rem'}}>Welcome</span>
                <span style={{color: "#1a1a1a", fontSize: '5rem' }}>{username}</span>
                <img src={profileImg} style={{borderRadius: "100%"}} height={64} width={64} alt={"Profile Picture"}/>
            </Trail>
        </div>
    )
}

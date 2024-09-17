import './TabSelector.module.css';
import classes from './TabSelector.module.css';

export default function TabSelector({currentTab, tab, text, onClick}) {
    return <p className={currentTab==tab ? `${classes.header_nav_tab} ${classes.active}` : `${classes.header_nav_tab}`} onClick={onClick}>{text}</p>
}
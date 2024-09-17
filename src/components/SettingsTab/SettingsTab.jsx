import classes from './SettingsTab.module.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

export default function SettingsTab() {

    return (
    <section className={classes.settings}>
        <div className={classes.settings_win}>
            <p className={classes.settings_title}>Сеть</p>
            <form action="" className={classes.settings_form}>
                <input type="text" id='ipvalue' className={classes.settings_input} placeholder="IP x.x.x.x"/>
                <input type="text" id= 'portvalue' className={classes.settings_input} placeholder="Port"/>
                <button className={classes.btn}>Сохранить</button>
            </form>
        </div>
    </section>
  );

}
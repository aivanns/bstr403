import classes from './Header.module.css';
import TabSelector from '../TabSelector/TabSelector';
import SettingsTab from '../SettingsTab/SettingsTab';
import LogsTab from '../LogsTab/LogsTab';
import PanelTab from '../PanelTab/PanelTab';
import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

export default function Header() {

    const cookies = new Cookies();
    const [currentTab, setTab] = useState(localStorage.getItem('currentTab') || 'tab1');
    const [isOpen, setIsOpen] = useState(false);

    function handleTab(tab) {
        setTab(tab)
        localStorage.setItem('currentTab', tab);
    }
    return (
        <>
            <header className={classes.header}>
                <div className={classes.header_nav}>
                    <p className={classes.header_nav_name}>BSTR403</p>
                    <div className={classes.header_nav_tabs}>
                        <TabSelector currentTab={currentTab} tab={'tab1'} text={'Панель управления'} onClick={() => handleTab('tab1')}/>
                        <TabSelector currentTab={currentTab} tab={'tab2'} text={'Логирование'} onClick={() => handleTab('tab2')}/>
                        <TabSelector currentTab={currentTab} tab={'tab3'} text={'Настройки'} onClick={() => handleTab('tab3')}/>
                    </div>
                    {cookies.get('auth') == undefined && <p className={classes.header_link} onClick={() => setIsOpen(true)}>Войти</p>}
                    {cookies.get('auth') != undefined && <p>{jwtDecode(cookies.get('auth'))['subject']['username']}</p>}
                    {isOpen && <LoginModal setIsOpen={setIsOpen}/>}
                </div>
            </header>
            <main className={classes.main}>
                {currentTab == 'tab1' && <PanelTab />}
                {currentTab == 'tab2' && <LogsTab />}
                {currentTab == 'tab3' && <SettingsTab />}
            </main>
        </>
  );

}
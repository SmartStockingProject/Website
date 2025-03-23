import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/logo.JPG';

const ToolBarComponent: React.FC = () => {
    const routes = [
        { label: 'בית', icon: 'pi pi-home', command: () => window.location.href = '/' },
        { label: 'מוצרים', icon: 'pi pi-info-circle', command: () => window.location.href = '/products' },
        { label: 'משתמשים', icon: 'pi pi-envelope', command: () => window.location.href = '/chooseUser' },
        { label: 'העלאת מוצרים', icon: 'pi pi-upload', command: () => window.location.href = '/uploadProducts' }

    ];
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).name : "לא מחובר";
    const user = <Button label={username} icon="pi pi-user" className="p-button-text" />;

    const leftContents = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '60px' }} />
        </div>
    );

    const centerContents = (
        <Menubar model={routes} />
    );

    const rightContents = (
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Button
            label={username}
            icon="pi pi-user"
            className="p-button-text"
            onClick={(e) => {
                const menu = document.getElementById('user-menu');
                if (menu) {
                menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
                }
            }}
            />
            <div
            id="user-menu"
            style={{
                display: 'none',
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                zIndex: 1000,
            }}
            >
            <Button
                label="התנתק"
                className="p-button-text"
                onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/';
                }}
                style={{ width: '100%' }}
            />
            <Button
                label= "החלף משתמש"
                className="p-button-text"
                onClick={() => window.location.href = '/chooseUser'}
                style={{ width: '100%' }}
            />
            </div>
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <Toolbar
                left={leftContents}
                center={centerContents}
                right={rightContents}
                style={{ justifyContent: 'space-between', width: '100%' }}
            />
        </div>
    );
};

export default ToolBarComponent;
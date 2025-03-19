import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/logo.JPG';

const ToolBarComponent: React.FC = () => {
    // const logo = <img src="../../assets/logo.JPG" alt="Logo" style={{ height: '40px' }} />;
    const routes = [
        { label: 'בית', icon: 'pi pi-home', command: () => window.location.href = '/' },
        { label: 'מוצרים', icon: 'pi pi-info-circle', command: () => window.location.href = '/products' },
        { label: 'משתמשים', icon: 'pi pi-envelope', command: () => window.location.href = '/chooseUser' }
    ];
    const usernmae = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).name : "לא מחובר";
    const user = <Button label={usernmae} icon="pi pi-user" className="p-button-text" />;

    const leftContents = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '60px' }} />
        </div>
    );

    const centerContents = (
        <Menubar model={routes} />
    );

    const rightContents = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {user}
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
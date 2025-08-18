import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { User } from '../../models/user.model';


const users: User[] = [
    { id: "1", name: 'שפרה גלפמן'},
    { id: "2", name: 'שפרה פריימן'},
    { id: "3", name: 'חיה קוק'},
    { id: "4", name: 'משתמש נוסף'},
    { id: "5", name: 'משתמש נוסף 2' },
    { id: "6", name: 'משתמש נוסף 3' },
];

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const ChooseUserPage: React.FC = () => {
    const toast = useRef<Toast>(null);

    const showTosat = (name: string) => {
        toast.current?.show({ severity: 'info', summary: 'ברוך שובך', detail: 'שלום ל' + name });
    };

    const handleUserSelect = (user: User) => {
        showTosat(user.name);
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
            window.location.href = "/products";
        }, 2000);
    };

    return (
        <div className="choose-user-page" style={{ marginTop: '10em', direction: "rtl" }}>
            <Toast ref={toast} position="top-center" />
            <div className="header">
                <h1>שלום, מי אתה?</h1>
                <Divider />
            </div>
            <div className="user-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {users.map((user) => (
                    <Card
                        key={user.id}
                        title={user.name}
                        subTitle="משתמש"
                        className="user-card"
                        style={{ margin: '0.5rem' }}
                    >
                        <div className="p-d-flex p-jc-center">
                            <Button
                                label="בחר"
                                icon="pi pi-check"
                                className="p-button-rounded"
                                style={{ backgroundColor: getRandomColor(), borderColor: 'gray' }}
                                onClick={() => handleUserSelect(user)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ChooseUserPage;
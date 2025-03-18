import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

interface User {
    id: number;
    name: string;
    role: string;
}

const users: User[] = [
    { id: 1, name: 'שפרה גלפמן', role: 'מנהל' },
    { id: 2, name: 'שפרה פריימן', role: 'עובד' },
    { id: 3, name: 'חיה קוק', role: 'עובד' },
    { id: 4, name: 'משתמש נוסף', role: 'עובד' },
    { id: 5, name: 'משתמש נוסף 2', role: 'מנהל' },
    { id: 6, name: 'משתמש נוסף 3', role: 'עובד' },
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
    const handleUserSelect = (user: User) => {
        alert("hello"+user.name);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "/products";

    };

    return (
        <div className="choose-user-page" style={{ marginTop: '10em', direction: "rtl" }}>
            <div className="header">
                <h1>שלום, מי אתה?</h1>
                <Divider />
            </div>
            <div className="user-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {users.map((user) => (
                    <Card
                        key={user.id}
                        title={user.name}
                        subTitle={user.role}
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
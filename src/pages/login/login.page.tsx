import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const LoginPage = () => {

    const [password, setPassword] = useState<string>('');
    const sendPassword = () => {
        // servise.login...
        if (password == '1234')
            window.location.href = "/chooseUser";
        else
            alert('סיסמה שגויה');
    }

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" width={"5px"} />
    );
    const footer = (
        <>
            <Button type="button" label='התחבר' onClick={sendPassword} />
        </>
    );
    return (
        <>
            <div className="card flex justify-content-center" style={{ width: "25rem", marginTop: "10rem" }}>
                <Card title="כניסה למערכת" subTitle="הקש סיסמה כדי להיכנס למערכת" footer={footer} header={header} className="md:w-25rem">
                    <InputText type='text' placeholder=' סיסמה' onChange={e => setPassword(e.target.value)} />
                </Card>
            </div>
        </>
    );
};


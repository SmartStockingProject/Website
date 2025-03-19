import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const LoginPage = () => {
    const sendPassword = () => {
        // servise.login...
        window.location.href = "/chooseUser";
    }

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" width={"5px"} />
    );
    const footer = (
        <>
            <Button  type="button" label='התחבר' onClick={sendPassword}/>
        </>
    );
    return (
        <>
            <div className="card flex justify-content-center" style={{ width: "25rem", marginTop: "10rem" }}>
                <Card title="כניסה למערכת" subTitle="הקש סיסמה כדי להיכנס למערכת" footer={footer} header={header} className="md:w-25rem">
                    <InputText type='text' placeholder=' סיסמה' />
                </Card>
            </div>
        </>
    );
};


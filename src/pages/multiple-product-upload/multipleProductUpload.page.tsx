import React, { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';

const MultipleProductUploadPage: React.FC = () => {

    const handleUploadPdf = (event: any) => {
        const file = event.files[0];
        if (file) {
            console.log('Uploaded PDF:', file.name);
        }
    };

    const handleUploadExcel = (event: any) => {
        const file = event.files[0];
        if (file) {
            console.log('Uploaded Excel:', file.name);
        }
    };

    const handleDownloadExample = () => {
        const exampleFileUrl = '/products.xlsx';
        const link = document.createElement('a');
        link.href = exampleFileUrl;
        link.download = 'example.xlsx';
        link.click();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>העלאת פריטים מרובה</h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <Card title="העלאת קבלות סרוקות">
                    <div style={{ marginBottom: '20px' }}>
                        <FileUpload
                            name="pdf"
                            accept="application/pdf"
                            customUpload
                            uploadHandler={handleUploadPdf}
                            chooseLabel="בחירת קובץ PDF"
                        />
                        <Button
                            label="הוראות"
                            icon="pi pi-info-circle"
                            className="p-button-secondary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => alert('העלה קובץ PDF המכיל את הקבלות שברצונך להוסיף.')}
                        />
                    </div>
                </Card>

                <Card title="העלאת קבצי אקסל">
                    <div style={{ marginBottom: '20px' }}>
                        <FileUpload
                            name="excel"
                            accept=".xlsx, .xls"
                            customUpload
                            uploadHandler={handleUploadExcel}
                            chooseLabel="בחירת קובץ אקסל"
                        />
                        <Button
                            label="הוראות"
                            icon="pi pi-info-circle"
                            className="p-button-secondary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => alert('העלה קובץ אקסל המכיל את המוצרים שברצונך להוסיף.')}
                        />
                    </div>
                </Card>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Button
                    label="הורדת תבנית אקסל למוצרים"
                    icon="pi pi-download"
                    onClick={handleDownloadExample}
                    className="p-button-success"
                />
            </div>
        </div>
    );
};

export default MultipleProductUploadPage;
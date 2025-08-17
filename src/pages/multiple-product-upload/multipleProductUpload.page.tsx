import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import { Card } from 'primereact/card';
import { createWorker } from 'tesseract.js';
import "./multipleProductUpload.css";

import 'primeicons/primeicons.css'; // Icons
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
// import Modal from '../../components/modal/modal.component';

// הגדר את workerSrc
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;


// import { Toast } from 'primereact/toast';
// import { Avatar } from 'primereact/avatar';
// @ts-ignore
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.js';
// import pdfToText from 'pdf-to-text';


const MultipleProductUploadPage: React.FC = () => {

    const [showText, setShowText] = useState(false);
    const handleShowText = () => {
        setShowText(true);
    };

    const handleCloseText = () => {
        setShowText(false);
    };

    let fileText = "אנא המתן...";

    const handlePdfUploadReception = (event: any) => {
        const file = event.files[0];
        if (file) {
            // extractTextFromPDF(file);
            const fileUrl = URL.createObjectURL(file);
            recognizeTextFromPdf(fileUrl);
            console.log('Uploaded PDF:', file);
        }
    };

    const handleImageUploadReception = (event: any) => {
        const file = event.files[0];
        if (file) {
            // extractTextFromPDF(file);
            const fileUrl = URL.createObjectURL(file);
            recognizeTextFromImage(fileUrl);
            console.log('Uploaded PDF:', file);
        }
    };

    // const extractTextFromPDF = (filePath: any) => {
    //     pdfToText.pdfToText(filePath, (err: any, text: any) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             console.log(text);
    //         }
    //     });
    // };

    // const handleUploadPdf = async (event: any) => {
    //     try {worker
    //         const file = event.files[0];
    //         if (file) {
    //             console.log('Uploaded PDF:', file.name);
    //             const fileReader = new FileReader();
    //             fileReader.onload = async () => {
    //                 const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
    //                 const pdf = await pdfjsLib.getDocument(typedArray).promise;
    //                 let textContent = '';

    //                 for (let i = 1; i <= pdf.numPages; i++) {
    //                     const page = await pdf.getPage(i);
    //                     const text = await page.getTextContent();
    //                     const textItems = text.items.map((item: { str: any; }) => item.str);
    //                     textContent += textItems.join(' ') + '\n';
    //                 }

    //                 console.log('Extracted Text:', textContent);
    //             };
    //             fileReader.readAsArrayBuffer(file);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         alert('הקובץ שהועלה אינו קובץ PDF תקין.');
    //     }
    // };

    // const recognizeTextInEnglish = (image: string) => {//for english
    //     Tesseract.recognize(
    //         image,
    //         'eng',
    //         {
    //             logger: info => console.log(info)
    //         }
    //     ).then(({ data: { text } }) => {
    //         console.log('הקובץ פוענח בהצלחה:')
    //         alert(text)
    //         console.log(text);
    //     });
    // };

    const recognizeTextFromPdf = async (file: string) => {
        try {
            const imageDataUrl: string = await convertPdfToImages(file);
            if (imageDataUrl !== "error") {
                const worker = await createWorker();

                await worker.load();
                await worker.reinitialize('heb');
                console.log('Pending recognition...');
                const { data: { text } } = await worker.recognize(imageDataUrl);
                console.log('הקובץ פוענח בהצלחה:');
                console.log(text);
                await worker.terminate();
            }
        } catch (error) {
            console.log(error);
            alert('הקובץ שהועלה אינו קובץ PDF תקין.');
        }
    };


    const recognizeTextFromImage = async (file: string) => {
        const worker = await createWorker();

        await worker.load();
        await worker.reinitialize('heb');
        console.log('Pending recognition...');
        const { data: { text } } = await worker.recognize(file);
        console.log('הקובץ פוענח בהצלחה:')
        console.log(text);
        fileText = text;
        await handleShowText();
        await worker.terminate();

    };

    const convertPdfToImages = async (fileUrl: string): Promise<string> => {
        console.log('Converting PDF to images...', fileUrl);
        const loadingTask = getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport }).promise;
            const imageDataUrl = canvas.toDataURL();
            console.log("Image Data URL:", imageDataUrl);
            return imageDataUrl;
        }
        return "error";
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

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
                            uploadHandler={handlePdfUploadReception}
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
                <Card title="העלאת קבצי קבלות כתמונות">
                    <div style={{ marginBottom: '20px' }}>
                        <FileUpload
                            name="image"
                            accept="image/*"
                            customUpload
                            uploadHandler={
                                handleImageUploadReception
                            }
                            chooseLabel="בחירת קובץ תמונה"
                        />
                        <Button
                            label="הוראות"
                            icon="pi pi-info-circle"
                            className="p-button-secondary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => alert('העלה קובץ תמונה המכיל את הקבלות שברצונך להוסיף.')}
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
            {showText &&
                (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>תרגום הקובץ שלך:</h2>
                            <p>{fileText}</p>
                            <Button onClick={handleCloseText}>סגור</Button>
                        </div>
                    </div>
                )}

        </div>
    );
};

export default MultipleProductUploadPage;
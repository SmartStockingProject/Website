import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Product } from '../../models/product.model';


const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        // Mock data
        setProducts([
            {
                id: "1", barkod: "123456", name: 'עט פיילוט 0.4', class: 'WritingInstruments', consumerPrice: 8,
                importerPrice: 0,
                quantity: 0,
            },            {
                id: "123", barkod: "444", name: 'עט פיילוט 0.6', class: 'WritingInstruments', consumerPrice: 10,
                importerPrice: 0,
                quantity: 0,
            },            {
                id: "3", barkod: "555", name: 'חבילת צבעי פסטל', class: 'WritingInstruments', consumerPrice: 100,
                importerPrice: 0,
                quantity: 0,
            },            {
                id: "31", barkod: "222", name: 'חבילת דפי צילום A4', class: 'Paperwork', consumerPrice: 100,
                importerPrice: 0,
                quantity: 0,
            }, 
        ]);
    }, []);

    const categories = [
        { label: 'All', value: null },
        { label: 'WritingInstruments', value: 'WritingInstruments' },
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Paperwork', value: 'Paperwork' },
    ];
    const onCategoryChange = (e: { value: string | null }) => {
        setSelectedCategory(e.value);
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const updatedProducts = [...products];
        const { newData, index } = e.data as { newData: Product; index: number };
        updatedProducts[index] = newData;
        setProducts(updatedProducts);
    };

    const textEditor = (options: any) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
                style={{ width: '100%' }}
            />
        );
    };

    const categoryEditor = (options: any) => {
        return (
            <Dropdown
                value={options.value}
                options={categories}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="בחר מחלקה"
                style={{ width: '100%' }}
            />
        );
    };

    const priceEditor = (options: any) => {
        return (
            <InputText
                type="number"
                value={options.value}
                onChange={(e) => options.editorCallback(parseFloat(e.target.value))}
                style={{ width: '100%' }}
            />
        );
    };

    const filteredProducts = products.filter((product) => {
        return (
            (!selectedCategory || product.class === selectedCategory) &&
            (!globalFilter || product.name!.toLowerCase().includes(globalFilter.toLowerCase()))
        );
    });

    return (
        <div className="products-page" style={{ direction: "rtl" }}>
            <h1>מוצרים בחנות</h1>
            <div className="p-grid p-align-center p-justify-between" style={{ marginBottom: '1rem' }}>
                <div className="p-col-6">
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="חיפוש לפי שם מוצר"
                        style={{ width: '20%' }}
                    />
                </div>
                <br />
                <div className="p-col-3">
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={onCategoryChange}
                        placeholder="בחר קטגוריה"
                        style={{ width: '20%' }}
                    />
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <DataTable
                    value={filteredProducts}
                    paginator
                    rows={5}
                    sortMode="single"
                    editMode="row"
                    onRowEditComplete={onRowEditComplete}
                    style={{ minWidth: '1200px', tableLayout: 'fixed' }}
                >
                    <Column field="barkod" header="ברקוד" sortable editor={(options) => textEditor(options)}></Column>
                    <Column field="name" header="שם" sortable editor={(options) => textEditor(options)}></Column>
                    <Column
                        field="class"
                        header="מחלקה"
                        sortable
                        editor={(options) => categoryEditor(options)}
                    ></Column>
                    <Column
                        field="consumerPrice"
                        header="מחיר לצרכן"
                        sortable
                        editor={(options) => priceEditor(options)}
                    ></Column>
                    <Column
                        field="importerPrice"
                        header="מחיר יבואן"
                        sortable
                        editor={(options) => priceEditor(options)}
                    ></Column>
                    <Column
                        field="quantity"
                        header="כמות במלאי"
                        sortable
                        editor={(options) => priceEditor(options)}
                    ></Column>
                    <Column
                        field="user"
                        header="משתמש"
                        sortable
                        editor={(options) => textEditor(options)}
                    ></Column>
                    <Column
                        field="date"
                        header="תאריך ספירה"
                        sortable
                        // editor={(options) => dateEditor(options)}
                    ></Column>
                    <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        </div>
    ) }

export default ProductsPage;

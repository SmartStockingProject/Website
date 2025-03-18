import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        // Mock data
        setProducts([
            { id: 1, name: 'עט פיילוט 0.4', category: 'WritingInstruments', price: 100 },
            { id: 2, name: 'מרקר צהוב', category: 'WritingInstruments', price: 50 },
            { id: 3, name: 'מחשבון מדעי', category: 'Electronics', price: 200 },
            { id: 4, name: 'חבילת דפי צילום A4', category: 'Paperwork', price: 300 },
             { id: 1, name: 'חפיסת צבעי פסטל', category: 'Electronics', price: 100 },
            { id: 2, name: 'לורד לוח ארטליין', category: 'WritingInstruments', price: 50 },
            { id: 3, name: 'מחשבון רגיל', category: 'Electronics', price: 200 },
            { id: 4, name: 'חבילת דפי צילום A3', category: 'Paperwork', price: 300 },
        ]);
    }, []);

    const categories = [
        { label: 'All', value: null },
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Clothing', value: 'Clothing' },
        { label: 'Furniture', value: 'Furniture' },
    ];

    const onCategoryChange = (e: { value: string | null }) => {
        setSelectedCategory(e.value);
    };

    const filteredProducts = products.filter((product) => {
        return (
            (!selectedCategory || product.category === selectedCategory) &&
            (!globalFilter || product.name.toLowerCase().includes(globalFilter.toLowerCase()))
        );
    });

    return (
        <div className="products-page">
            <h1>מוצרים בחנות</h1>
            <div className="p-grid p-align-center p-justify-between" style={{ marginBottom: '1rem' }}>
                <div className="p-col-6">
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="חיפוש לפי שם מוצר"
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="p-col-3">
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={onCategoryChange}
                        placeholder="בחר קטגוריה"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <DataTable value={filteredProducts} paginator rows={5} sortMode="single">
                <Column field="id" header="ברקוד" sortable></Column>
                <Column field="name" header="שם" sortable></Column>
                <Column field="category" header="קטגוריה" sortable></Column>
                <Column field="price" header="מחיר" sortable></Column>
            </DataTable>
        </div>
    );
};

export default ProductsPage;
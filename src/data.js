const BASE_URL = 'https://webinars.webdev.education-services.ru/sp7-api';

export function initData(sourceData) {
    let sellers;
    let customers;
    let lastResult;
    let lastQuery;
    
    const mapRecords = (data) => data.map(item => {
    
    return {
        id: item.receipt_id,
        date: item.date,
        seller: sellers?.[item.seller_id] || `Seller ${item.seller_id}`, // временное решение
        customer: customers?.[item.customer_id] || `Customer ${item.customer_id}`, // временное решение
        total: item.total_amount
    }
});

    const getIndexes = async () => {
        if (!sellers || !customers) {
            [sellers, customers] = await Promise.all([
                fetch(`${BASE_URL}/sellers`).then(res => res.json()),
                fetch(`${BASE_URL}/customers`).then(res => res.json()),
            ]);
        }
        return { sellers, customers };
    }

    const getRecords = async (query, isUpdated = false) => {
        const qs = new URLSearchParams(query);
        const nextQuery = qs.toString();

        if (lastQuery === nextQuery && !isUpdated) {
            return lastResult;
        }

        if (!sellers || !customers) {
            await getIndexes();
        }

        const response = await fetch(`${BASE_URL}/records?${nextQuery}`);
        const records = await response.json();  

        lastQuery = nextQuery;
        lastResult = {
            total: records.total,
            items: mapRecords(records.items)
        };

        return lastResult;
    };

    return {
        getIndexes,
        getRecords
    }
}
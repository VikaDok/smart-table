export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        if (action && action.name === 'clear') {
            // Находим поле ввода через parentElement
        const inputElement = action.parentElement.querySelector('input, select');
        if (inputElement) {
            inputElement.value = '';
            
            // Триггерим событие input чтобы обновить state и перерендерить таблицу
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    const filter = {};
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                filter[`filter[${elements[key].name}]`] = elements[key].value;
            }
        }
    })

    return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
}

    return {
        updateIndexes,
        applyFiltering
    }
}
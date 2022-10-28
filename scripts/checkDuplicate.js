export class CheckDuplicate {
    static categories = (apiData, value) => {
        const provisionalData = [...apiData];
        let count = 0;

        const newData = provisionalData.map((elem, i) => {
            if (elem.category == value) {
                count++;
            } 
            if (count > 1) {
                delete provisionalData[i];
                count--;
            } else {
                return elem.category;
            }
        });
        return newData;
    }
}
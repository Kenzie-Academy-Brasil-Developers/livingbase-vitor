export class CheckDuplicate {
    static categories = (apiData, value) => {
        let count = 0;
        apiData.forEach((elem, i) => {
            if (elem.category == value) {
                count++;
            } 
            if (count > 1) {
                delete apiData[i];
                count--;
            }
        });

    }
}
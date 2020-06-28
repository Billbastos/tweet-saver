class LocalStorageService {

    get localItems() {
        return JSON.parse(localStorage.getItem('tweets')) || [];
    }

    add(item) {
        const arrToAdd = [...this.localItems];
        arrToAdd.push(item);
        localStorage.setItem('tweets', JSON.stringify(arrToAdd)); 
    }

    remove(id) {
        const idx = this.localItems.findIndex( i => i.id.toString() === id.toString());
        if ( idx !== -1 ) {
            const arrUpdated = [...this.localItems];
            const deleted = arrUpdated.splice(idx, 1);
            localStorage.setItem('tweets', JSON.stringify(arrUpdated));
            return deleted[0];
        }
        return false;
    }

    isStoraged(item) {
        return this.localItems.some(i => item.id.toString() === i.id.toString())
    }
}

export default (function getInstance() {
    return new LocalStorageService();
})();
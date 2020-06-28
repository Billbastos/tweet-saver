import moment from 'moment';

class Helper {
    static formatDateFrom(milliseconds) {
        return moment(milliseconds).format("DD MMM YYYY");
    }
}

export default Helper;
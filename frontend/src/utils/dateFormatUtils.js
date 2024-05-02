import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';


const dateFormat = (date) => {
    return format(date, "EEEE, do MMMM, yyyy 'at' HH:mm", { locale: enGB });
}

export default dateFormat;


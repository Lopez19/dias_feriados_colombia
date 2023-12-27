declare module 'festivos-colombia' {

    export interface Festivo {
        name: string;
        date: string;
        nameDay: string;
    }

    export function getHolidaysByYear(year): [];
}
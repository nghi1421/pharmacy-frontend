import { Staff } from "./Staff";

export interface Trouble {
    id: number;
    staff: Staff;
    batchId: string;
    troubleDate: string;
    note: string;
}
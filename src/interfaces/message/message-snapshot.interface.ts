/**
 * Interface of the message class snapshot method output
 */
export interface IMessageSnapshot {
    // Message id
    id: string;
    // Timestamp when message arrived
    date: number;
    // Message payload
    payload: any;
    // Lock id
    lockId?: string;
    // Timestamp when message locked
    lockDate?: number;
    // How many milliseconds should be locked
    lockDuration?: number;
}

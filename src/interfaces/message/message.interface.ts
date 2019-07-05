/**
 * Interface of the generic message class
 */
import {IMessageSnapshot} from './message-snapshot.interface';

export interface IMessage {
    // Message id
    id: string;
    // Date when message arrived
    date: Date;
    // Message payload
    payload: any;
    // Lock id
    lockId?: string;
    // Date when message locked
    lockDate?: Date;
    // How many milliseconds should be locked
    lockDuration?: number;

    /**
     * Lock message
     * @param {number} lockDuration
     * @return {string}
     */
    lock(lockDuration?: number): string;

    /**
     * Unlock message
     */
    unlock(): void;

    /**
     * Create message json snapshot
     * @return {IMessageSnapshot}
     */
    snapshot(): IMessageSnapshot;

    /**
     * Create stringified snapshot
     * @return {string}
     */
    toString(): string;
}

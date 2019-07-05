import {IMessage, IMessageSnapshot} from '../../interfaces';

export class TopicMessageStore {
    public messages: IMessage[];
    // TODO: sync lockIndex with queue
    public lockedIndexes: number[];

    // TODO: implement
    // add similar methods to POC class (read, reserve., drain)

    /**
     * Get snapshot of all stored messages
     * @return {IMessageSnapshot[]}
     */
    public snapshot(): IMessageSnapshot[]{
        // TODO: implement
        return [];
    }

    /**
     * Queue message
     */
    public queue(payload: any): void{
        // TODO: implement
    }

    /**
     * Read message from topic(s) and discard it from queue.
     * @param {number} count
     */
    public read(count: number): void{
        // read
        // discard
        // TODO: implement
    }

    /**
     * Read message and locks it
     * @param {number} count
     * @param {string} lockId
     * @param {number} time
     */
    public reserve(count: number, lockId?: string, time?: number): void{
        // read
        // lock
        // TODO: implement
    }

    /**
     * remove message under index for specific topic
     * @param {number} index
     */
    public discard(index: number): void{
        // TODO: implement
    }

    /**
     * Remove all messages for specific topics.
     */
    public drain(): void{
        // TODO: implement
    }

    /**
     * Requeue stale messages - move it to the last position in the queue
     * @param {number} index
     */
    public requeue(index: number): void{
    }

    /**
     * Lock message under index
     * @param {number} index
     */
    public lock(index: number): void{
        // TODO: implement
    }

    /**
     * Unlock message under index
     * @param {number} index
     */
    public unlock(index: number): void{
        // TODO: implement
        // unlock over time
    }
}

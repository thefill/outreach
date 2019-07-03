import {v1 as uuid} from 'uuid';

// tslint:disable-next-line
export class POC implements IPOCConfig {
    // by default no repos // TODO: add default in-memory repo
    public storageRepositories = [];
    // by default after 1 day we set message as stale
    public staleTreshold = 1000 * 60 * 60 * 24;
    // by default we don't suppress errors
    public suppressErrors = false;
    // by default any topic
    public supportedTopics = undefined;
    // by default 30min
    public lockDuration = 1000 * 60 * 30;

    // multiple topics + orphan
    protected topicStores: { [topic: string]: MessageStore };

    constructor(config: IPOCConfig){
        this.applyConfig(config);
    }

    /**
     * Get snapshot of all stored messages for topics
     * @param {[]} topics
     * @return {{[p: string]: IMessageSnapshot}}
     */
    public snapshot(topics?: []): { [topic: string]: IMessageSnapshot[] }{
        // TODO: implement
        return {};
    }

    /**
     * Queue messages for topic
     */
    public queue(payload: any, topics?: string[]): void{
        // TODO: implement
    }

    /**
     * Read message from topic(s) and discard it from queue.
     * @param {number} count
     * @param {string[]} topics
     */
    public read(count: number, topics?: string[]): void{
        // read
        // discard
    }

    /**
     * Read message and locks it
     * @param {number} count
     * @param {string} lockId
     * @param {string[]} topics
     * @param {number} time
     */
    public reserve(count: number, topics?: string[], lockId?: string, time?: number): void{
        // read
        // lock
    }

    /**
     * remove message under index for specific topic
     * @param {string} topic
     * @param {number} index
     */
    public discard(topic: string, index: number): void{
        // TODO: implement
    }

    /**
     * Remove all messages for specific topics.
     * If no topics provided all topics will be drained.
     * If supportedTopics defined fot the instance only this topics will be drained.
     * @param {string[]} topics
     */
    public drain(topics?: string[]): void{
        // TODO: implement
    }

    /**
     * Requeue stale messages - move it to the last position in the queue
     * @param {string} topic
     * @param {number} index
     */
    protected requeue(topic: string, index: number): void{
    }

    /**
     * Lock message under index for specific topic
     * @param {string} topic
     * @param {number} index
     */
    protected lock(topic: string, index: number): void{
        // TODO: implement
    }

    /**
     * Unlock message under index for specific topic
     * @param {string} topic
     * @param {number} index
     */
    protected unlock(topic: string, index: number): void{
        // TODO: implement
        // unlock over time
    }

    /**
     * Apply config
     * @param {IPOCConfig} config
     */
    protected applyConfig(config: IPOCConfig): void{
        if (!config){
            return;
        }

        Object.assign(this, config);
    }
}

// tslint:disable-next-line
export interface IPOCStorageRepository {
    // TODO: implement
}

// tslint:disable-next-line
export class MessageStore {
    public messages: Message[];
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

/**
 * Initial config
 */
export interface IPOCConfig {
    // on lock/unlock/discard/drain
    storageRepositories?: IPOCStorageRepository[];
    // how long to keep message in queue until re-queuing
    staleTreshold?: number;
    // dont throw errors
    suppressErrors?: boolean;
    // supported topics by this instance
    supportedTopics?: string[];
    // for how many ms we lock messages by default,
    // if explicitly set to undefined we lock messages indefinitely
    lockDuration?: number;
}

/**
 * Class for generic message entry
 */
// tslint:disable-next-line
export class Message implements IMessage {
    public id: string;
    public date: Date;
    public payload: any;
    public lockId?: string;
    public lockDate?: Date;
    public lockDuration?: number;

    constructor(payload: any){
        this.payload = payload;
        this.id = uuid();
        this.date = new Date();
    }

    /**
     * Lock message. If duration provided locks for specific amount of time
     * @param {number} lockDuration
     * @return {string}
     */
    public lock(lockDuration?: number): string{
        this.lockId = uuid();
        this.lockDate = new Date();

        if (!isNaN(lockDuration as number)){
            this.lockDuration = lockDuration;
        }

        return this.lockId;
    }

    /**
     * Unlock message
     */
    public unlock(): void{
        this.lockId = undefined;
        this.lockDate = undefined;
        this.lockDuration = undefined;
    }

    public snapshot(): IMessageSnapshot{

        const snapshot: IMessageSnapshot = {
            id: this.id,
            date: this.date.getTime(),
            payload: this.payload
        };

        if (this.lockId){
            snapshot.lockId = this.lockId;
        }

        if (this.lockDate){
            snapshot.lockDate = this.lockDate.getTime();
        }

        if (this.lockDuration){
            snapshot.lockDuration = this.lockDuration;
        }

        return snapshot;
    }

    public toString(): string{
        return JSON.stringify(this.snapshot());
    }
}

/**
 * Interface of the generic message class
 */
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

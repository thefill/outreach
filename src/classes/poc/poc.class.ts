// tslint:disable-next-line
export class POC implements IPOCConfig {
    public storageRepositories = [];
    public staleTreshold?: number;
    public suppressErrors?: boolean;

    // multiple topics + orphan
    protected topicStores: { [topic: string]: MessageStore };

    constructor(config: IPOCConfig){
        this.applyConfig(config);
    }

    /**
     * Get snapshot of all stored messages for topics
     * @param {[]} topics
     * @return {{[p: string]: IMessage}}
     */
    public snapshot(topics?: []): { [topic: string]: IMessage }{
        // TODO: implement
        return {};
    }

    /**
     * Queue messages for topic
     */
    public queue(payload: any, topics?: string[]){
    }

    /**
     * Requeue stale messages - move it to the last position in the queue
     * @param payload
     * @param {string[]} topics
     */
    public requeue(payload: any, topics?: string[]){
    }

    /**
     * Read message from topic(s) and discard it from queue.
     * @param {number} count
     * @param {string[]} topics
     */
    public read(count: number, topics?: string[]){
        // read
        // discard
    }

    /**
     * Read message and locks it
     * @param {number} count
     * @param {string} lockId
     * @param {string[]} topics
     * @param {number | string} time
     */
    public reserve(count: number, topics?: string[], lockId?: string, time?: number | string){
        // read
        // lock
    }

    public discard(){
    }

    public drain(topics: string[]){
    }

    protected lock(){
    }

    protected unlock(){
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

export interface IPOCConfig {
    // on lock/unlock/discard/drain
    storageRepositories?: IPOCStorageRepository[];
    // how long to keep message in queue until re-queuing
    staleTreshold?: number;
    // dont throw errors
    suppressErrors?: boolean;
}

// tslint:disable-next-line
export interface IPOCStorageRepository {

}

// tslint:disable-next-line
export class MessageStore {
    public queue: Message[];
    // TODO: sync lockIndex with queue
    public lockedIndexes: number[];

    // add similar methods to POC class (read, reserve., drain)
}

// tslint:disable-next-line
export class Message {
    public id: string;
    public date: Date;
    public payload: any;
    public lockId?: string;
    public lockDate?: string;
}

export interface IMessage {
    id: string;
    date: Date;
    payload: any;
    lockId?: string;
    lockDate?: string;
}

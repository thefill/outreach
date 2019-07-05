import {IMessageSnapshot, IMessageWarehouse, IMessageWarehouseConfig} from '../../interfaces';
import {TopicMessageStore} from '../topic-message-store';

// tslint:disable-next-line
export class MessageWarehouse implements IMessageWarehouse {
    // by default no repos // TODO: add default in-memory repo
    public readerRepositories = [];
    public writerRepositories = [];
    public providerRepositories = [];
    public distributorRepositories = [];
    // by default after 1 day we set message as stale
    public staleTreshold = 1000 * 60 * 60 * 24;
    // by default we don't suppress errors
    public suppressErrors = false;
    // by default any topic
    public supportedTopics = undefined;
    // by default 30min
    public lockDuration = 1000 * 60 * 30;

    constructor(config: IMessageWarehouseConfig){
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
        // TODO: implement
    }

    /**
     * Read message and locks it
     * @param {number} count
     * @param {string} lockId
     * @param {number} time
     * @param {string[]} topics
     */
    public reserve(count: number, lockId?: string, time?: number, topics?: string[]): void{
        // read
        // lock
        // TODO: implement
    }

    /**
     * remove message under index for specific topic
     * @param {number} index
     * @param {string[]} topics
     */
    public discard(index: number, topics?: string[]): void{
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
     * @param {number} index
     * @param {string[]} topics
     */
    protected requeue(index: number, topics?: string[]): void{
    }

    /**
     * Lock message under index for specific topic
     * @param {number} index
     * @param {string[]} topics
     */
    protected lock(index: number, topics?: string[]): void{
        // TODO: implement
    }

    /**
     * Unlock message under index for specific topic
     * @param {number} index
     * @param {string[]} topics
     */
    protected unlock(index: number, topics?: string[]): void{
        // TODO: implement
        // unlock over time
    }

    /**
     * Apply config
     * @param {IMessageWarehouseConfig} config
     */
    protected applyConfig(config: IMessageWarehouseConfig): void{
        if (!config){
            return;
        }

        Object.assign(this, config);
    }
}

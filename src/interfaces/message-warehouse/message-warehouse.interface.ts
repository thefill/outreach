import {IMessageSnapshot} from '../message';
import {
    IMessageCollectorRepository,
    IMessageDistributorRepository,
    IMessageReaderRepository,
    IMessageWriterRepository
} from '../message-repository';
import {IMessageWarehouseConfig} from './message-warehouse-config.interface';

/**
 * Interface for message warehouse
 */
export interface IMessageWarehouse extends IMessageWarehouseConfig {
    readerRepositories: IMessageReaderRepository[];
    writerRepositories: IMessageWriterRepository[];
    collectorRepositories: IMessageCollectorRepository[];
    distributorRepositories: IMessageDistributorRepository[];
    staleTreshold: number;
    suppressErrors: boolean;
    supportedTopics: string[] | void;
    lockDuration: number;

    /**
     * Get snapshot of all stored messages for topics
     * @param {[]} topics
     * @return {{[p: string]: IMessageSnapshot}}
     */
    snapshot: (topics?: []) => { [topic: string]: IMessageSnapshot[] };

    /**
     * Queue messages for topic
     */
    write: (payload: any, topics?: string[]) => void;

    /**
     * Read message from topic(s) and discard it from queue.
     * @param {number} count
     * @param {string[]} topics
     */
    read: (count: number, topics?: string[]) => void;

    /**
     * Read message and locks it
     * @param {number} count
     * @param {string} lockId
     * @param {string[]} topics
     * @param {number} time
     */
    reserve: (count: number, lockId?: string, time?: number, topics?: string[]) => void;

    /**
     * remove message under index for specific topic
     * @param {number} index
     * @param {string[]} topics
     */
    discard: (index: number, topics?: string[]) => void;

    /**
     * Remove all messages for specific topics.
     * If no topics provided all topics will be drained.
     * If supportedTopics defined fot the instance only this topics will be drained.
     * @param {string[]} topics
     */
    drain: (topics?: string[]) => void;
}

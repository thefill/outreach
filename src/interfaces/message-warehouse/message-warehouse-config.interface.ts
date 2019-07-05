import {
    IMessageCollectorRepository,
    IMessageDistributorRepository,
    IMessageReaderRepository,
    IMessageWriterRepository
} from '../message-repository';

/**
 * Initial config
 */
export interface IMessageWarehouseConfig {
    /**
     * repositories that handles read of storage of the messages
     */
    readerRepositories?: IMessageReaderRepository[];

    /**
     * repositories that handles write to of storage of the messages
     */
    writerRepositories?: IMessageWriterRepository[];

    /**
     * repositories that provides incoming messages
     */
    providerRepositories?: IMessageCollectorRepository[];

    /**
     * repositories that handles distribution of the message events outside the store
     */
    distributorRepositories?: IMessageDistributorRepository[];

    /**
     * how long to keep message in queue until re-queuing
     */
    staleTreshold?: number;

    /**
     * dont throw errors
     */
    suppressErrors?: boolean;

    /**
     * supported topics by this instance
     */
    supportedTopics?: string[] | void;

    /**
     * for how many ms we lock messages by default, if explicitly set to undefined we lock messages indefinitely
     */
    lockDuration?: number;
}

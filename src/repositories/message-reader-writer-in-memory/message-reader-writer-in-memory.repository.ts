import {TopicMessageStore} from '../../classes/topic-message-store';
import {IMessageReaderRepository, IMessageWriterRepository} from '../../interfaces/message-repository';

export class MessageReaderWriterInMemoryRepository implements IMessageReaderRepository, IMessageWriterRepository {

    // multiple topics + orphan
    protected topicStores: { [topic: string]: TopicMessageStore };


}

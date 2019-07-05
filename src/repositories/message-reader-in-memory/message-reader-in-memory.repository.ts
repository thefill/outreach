import {TopicMessageStore} from '../../classes/topic-message-store';
import {IMessageReaderRepository} from '../../interfaces/message-repository';

export class MessageReaderInMemoryRepository implements IMessageReaderRepository {

    // multiple topics + orphan
    protected topicStores: { [topic: string]: TopicMessageStore };
}

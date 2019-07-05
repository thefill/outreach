export interface IMessageDistributorRepository<EVENT_TYPE, PAYLOAD_TYPE> {
    notify: (eventType: EVENT_TYPE, payload: PAYLOAD_TYPE) => Promise<void>;
}

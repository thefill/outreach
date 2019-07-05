export interface IMessageCollectorRepository<PAYLOAD_TYPE> {
    read: (count: number) => Promise<PAYLOAD_TYPE>;
}

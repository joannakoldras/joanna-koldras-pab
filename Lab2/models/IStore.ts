interface IStorage {
    readStore(): Promise<string>
    updateStore(dataToSave: string): Promise<void>
}
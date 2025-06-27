import { Cliente } from "../../entities";

import { AppDataSource } from "../../config/typeOrm";

export class ClienteService {
    private clienteRepository = AppDataSource.getRepository(Cliente);

    constructor() {}

    public async createCliente(data: Partial<Cliente>): Promise<Cliente> {
        const cliente = this.clienteRepository.create(data);
        return await this.clienteRepository.save(cliente);
    }

    public async getAllClientes(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }

    public async getClienteById(id: number): Promise<Cliente | null> {
        return await this.clienteRepository.findOneBy({ id });
    }
}

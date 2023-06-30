import dotenv from 'dotenv'
dotenv.config();

import { createContainer, asClass, Lifetime } from 'awilix';

import UserMongooseRepository from './data/repositories/mongoose/userMongooseRepository.js'
import RoleMongooseRepository from './data/repositories/mongoose/roleMongooseRepository.js'
import ProductMongooseRepository from './data/repositories/mongoose/productMongooseRepository.js'
import CartMongooseRepository from './data/repositories/mongoose/cartMongooseRepository.js'
import TicketMongooseRepository from "./data/repositories/mongoose/ticketMongooseRepository.js";

const container = createContainer();

container.register('UserRepository', asClass(UserMongooseRepository), { Lifetime: Lifetime.SINGLETON });
container.register('RoleRepository', asClass(RoleMongooseRepository), { Lifetime: Lifetime.SINGLETON });
container.register('ProductRepository', asClass(ProductMongooseRepository), { Lifetime: Lifetime.SINGLETON });
container.register('CartRepository', asClass(CartMongooseRepository), { Lifetime: Lifetime.SINGLETON });
container.register('CartRepository', asClass(CartMongooseRepository), { Lifetime: Lifetime.SINGLETON });
container.register('TicketRepository', asClass(TicketMongooseRepository), { Lifetime: Lifetime.SINGLETON });

export default container
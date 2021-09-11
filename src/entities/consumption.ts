import { Product } from './product'
import { User } from './user';

interface Consumption {
    id: string,
    product: Product,
    user: User,
    start_location: number
    end_location: number
}

export { Consumption }

export type ServiceStatus = 'DOING' | 'FINISHED' | 'DELIVERED'

export type Service = {
    id: string
    costumerName: string
    professionalName: string
    service: string
    price: string
    costumerPhone: string
    status: ServiceStatus
}

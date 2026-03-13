import { Refeicao } from "../../core/types.js";

interface Cache {
    data: Refeicao[]
    timestamp: number
}

let cache: Cache | null = null

const CACHE_DURATION = 1000 * 60 * 10

export function getCardapioCache(): Refeicao[] | null {
    if (!cache) return null

    const now = Date.now()

    const expirado = now - cache.timestamp > CACHE_DURATION

    if (expirado) {
        cache = null
        return null
    }
    
    return cache.data
}

export function setCardapioCache(data: Refeicao[]) {
    cache = {
        data,
        timestamp: Date.now()
    }
}
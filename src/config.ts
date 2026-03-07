// central configuration values and environment helpers

import dotenv from 'dotenv'

dotenv.config()

export const BOT_TOKEN = process.env.BOT_TOKEN || ''
export const CARDAPIO_BASE_URL = process.env.CARDAPIO_BASE_URL ||
    'https://www.ufc.br/restaurante/cardapio/3-restaurante-universitario-de-russas'

export const SIPAC_URL = process.env.SIPAC_URL ||
    'https://si3.ufc.br/public/jsp/restaurante_universitario/consulta_comensal_ru.jsf'

export const EMOJI_REFEICAO: Record<string, string> = {
    DESJEJUM: '☕',
    ALMOCO: '🍛',
    JANTAR: '🌙'
}

export const EMOJI_CATEGORIAS: Record<string, string> = {
    Bebidas: '🥤',
    Pães: '🥖',
    Frutas: '🍎',
    Especial: '⭐',
    Principal: '🍛',
    Vegetariano: '🥗',
    Salada: '🥬',
    Guarnição: '🍲',
    Acompanhamento: '🍚',
    Suco: '🧃',
    Sobremesa: '🍰'
}

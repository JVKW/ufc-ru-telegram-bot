import * as cheerio from 'cheerio'
import { Refeicao, Categoria } from '../../core/types.js'

export async function carregarCardapio(url: string): Promise<Refeicao[]> {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const resultado: Refeicao[] = []

    $('table.refeicao').each((_, table) => {
        const classes = $(table).attr('class') || ''
        const tipo = (classes.split(' ')[1] || classes.split(' ')[0] || 'desconhecido').trim();

        const categorias: Categoria[] = []

        $(table)
            .find('tr.item')
            .each((_, row) => {
                const tds = $(row).find('td')

                const nomeCategoria = $(tds[0]).text().trim()

                const itens = $(tds[1])
                    .find('span.desc')
                    .toArray()
                    .reduce<string[]>((acc, el) => {
                        const $el = $(el)
                        const texto = $el.text().trim()

                        if (!texto) return acc

                        if ($el.hasClass('gluten') && acc.length > 0) {
                            acc[acc.length - 1] += ` ${texto}`
                        } else {
                            acc.push(texto)
                        }

                        return acc
                    }, [])

                if (nomeCategoria) {
                    categorias.push({
                        nome: nomeCategoria,
                        itens
                    })
                }
            })

        resultado.push({ tipo, categorias })
    })

    return resultado
}

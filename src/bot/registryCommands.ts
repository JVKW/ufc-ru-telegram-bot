import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import TelegramBot from 'node-telegram-bot-api'

function lerArquivosRecursivos(dir: string): string[] {
    let arquivos: string[] = []

    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        const caminho = path.join(dir, item.name)

        if (item.isDirectory()) {
            arquivos.push(...lerArquivosRecursivos(caminho))
        } 
        else if (item.isFile() && item.name.endsWith('.js')) {
            arquivos.push(caminho)
        }
    }

    return arquivos
}

export async function registrarComandos(bot: TelegramBot) {

    const comandosPath = path.resolve('./dist/commands')

    const arquivos = lerArquivosRecursivos(comandosPath)

    console.log('📦 Comandos encontrados:', arquivos)

    for (const arquivo of arquivos) {

        const fileUrl = pathToFileURL(arquivo).href

        const modulo = await import(fileUrl)

        const registrar = modulo.default

        if (typeof registrar === 'function') {
            registrar(bot)
            console.log(`✅ Comando carregado: ${arquivo}`)
        }
    }
}
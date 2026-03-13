import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"
import { Bot } from "grammy"

function lerArquivosRecursivos(dir: string): string[] {
  let arquivos: string[] = []

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const caminho = path.join(dir, item.name)

    if (item.isDirectory()) {
      arquivos.push(...lerArquivosRecursivos(caminho))
    } 
    else if (item.isFile() && item.name.endsWith(".js")) {
      arquivos.push(caminho)
    }
  }

  return arquivos
}

export async function registrarComandos(bot: Bot) {
  const comandosPath = path.resolve("./dist/modules")
  const arquivos = lerArquivosRecursivos(comandosPath)

  console.log("📦 Comandos encontrados:", arquivos)
  for (const arquivo of arquivos) {

    if (!arquivo.endsWith(".command.js")) continue

    const fileUrl = pathToFileURL(arquivo).href
    const modulo = await import(fileUrl)
    const comando = modulo.default

    if (!comando) continue

    bot.command(comando.name, async (ctx) => {
      const text = ctx.message?.text || ""
      const args = text.split(" ").slice(1)

      await comando.execute({
        ctx,
        args
      })

    })

    console.log(`✅ Comando carregado: ${comando.name}`)

  }

}
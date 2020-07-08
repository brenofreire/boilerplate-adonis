import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async cadastro ({ request, response }: HttpContextContract) {
    try {
      const dadosCadastro = await request.validate({
        schema: schema.create({
          email: schema.string({}, [
            rules.email(),
            rules.unique({ table: 'usuarios', column: 'email' }),
          ]),
          password: schema.string(),
          capitulo: schema.number(),
        }),
      })

      await Usuario.create({
        ...dadosCadastro,
        role: 'comum',
        status: 0,
      })

      return response.ok({ mensagem: 'Usuário criado com sucesso' })
    } catch (error) {
      return response.badRequest(error)
    }
  }
}

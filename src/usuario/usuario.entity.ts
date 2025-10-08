import * as bcrypt from "bcrypt";

export class UsuarioEntity{
    id: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    constructor(
        id: string, 
        nome: string, 
        email: string, 
        telefone:string,
        senha:string
    ){
        var saltOrRounds = 10;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this. telefone = telefone;
        this.senha = bcrypt.hashSync(senha, saltOrRounds);
    }
        trocarSenha(novaSenha: string){
        var saltOrRounds = 10;
        this.senha = bcrypt.hashSync(novaSenha, saltOrRounds); 
    }

    login(senha: string): boolean{
        return bcrypt.compareSync(senha, this.senha);
    }
}

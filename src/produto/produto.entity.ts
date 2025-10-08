export class ProdutoEntity{
    id: string;
    nome: string;
    marca: string;
    peso: string;
    preco: string
        constructor (id: string, nome: string, marca: string, peso: string, preco: string){
            this.id = id;
            this.nome = nome;
            this.marca = marca;
            this.peso = peso;
            this.preco = preco;
        }

}

export class Autor {
  constructor(autor, nacionalidade) {
      this._autor = autor;
      this._nacionalidade = nacionalidade;
  }

  set autor(autor){
    this._autor = autor;
  }

  set nacionalidade (nacionalidade){
    this._nacionalidade = nacionalidade ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }

  get autor(){
    return this._autor;
  }

  get nacionalidade(){
    return this._nacionalidade;
  }  

  get usuario(){
    return this._usuario;
  }   

}
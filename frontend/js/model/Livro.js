export class Livro {
  constructor(titulo, autor, publicado) {
    this._titulo = titulo;
    this._autor = autor;
    this._publicado = publicado;
  }

  set titulo(titulo) {
    this._titulo = titulo;
  }

  set autor(autor) {
    this._autor = autor;
  }

  set publicado(publicado) {
    this._publicado = publicado;
  }

  set usuario(usuario) {
    this._usuario = usuario;
  }

  get titulo() {
    return this._titulo;
  }
  get autor() {
    return this._autor;
  }

  get publicado() {
    return this._nacionalidade;
  }

  get usuario() {
    return this._usuario;
  }

}
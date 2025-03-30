import * as Crypto from 'expo-crypto';

export interface TUserAttr {
    id:string,
    cidade:string,
    estado:string,
    habitantes:number
}

const emptyUser:TUserAttr = {id:"",cidade:"",estado:"", habitantes:0}

export class User implements TUserAttr {
    
    private _data: TUserAttr = emptyUser;

    constructor(cidade?:string,estado?:string,habitantes?:number){
        this._data.id = Crypto.randomUUID()
        this._data.cidade = cidade?cidade:""
        this._data.estado = estado?estado:""
        this._data.habitantes = habitantes?habitantes:0
    }

    get id() {return this._data.id}
    
    get cidade() {return this._data.cidade}
    set cidade(s:string) {this._data.cidade = s}

    get estado() {return this._data.estado}
    set estado(s:string) {this._data.estado = s}

    get habitantes() {return this._data.habitantes}
    set habitantes(s:number) {this._data.habitantes = s}
    
    get data():TUserAttr { return this._data }
    get datacpy():TUserAttr { return {...this._data} }
}
class Base{
    constructor(nombre,minutos){
        this.nombre = nombre;
        this.minutos = minutos;
        this.next = null;
        this.prev = null;
    }
}

class Ruta{
    constructor(){
        this.first=null;
    }

    add(base){
        if (this.first == null) {
            this.first = base;
            this.first.next = this.first;
            this.first.prev = this.first;
        } else {
            let aux = this.first;
            while (aux.next != this.first) {
                aux = aux.next;
            }
            aux.next = base;
            aux.next.prev = aux;
            aux.next.next = this.first;
            this.first.prev = base;
        }
        return base;
    }

    found(base) {
        let aux = this.first;
        if (aux != null) {
            while (aux.nombre != base && aux.next != this.first) {
                aux = aux.next;
            }
            if (aux.nombre == base) {
                return aux;
            }
        }
    }

    delete(nombre){
    let aux = this.first

    if(this.first.nombre === nombre && this.first.next === this.first){
        this.first = null;
    } else if (this.first.nombre == nombre){
        this.first.next.prev = this.first.prev
        this.first.prev.next = this.first.next
        this.first = this.first.next
    } else {
        while (aux.next.nombre != nombre){
            aux = aux.next
        }
        if(aux.next.nombre == nombre){
            aux.next = aux.next.next;
            aux.next.prev = aux;
            }
        }
    }

    prints(){
        let aux = this.first;
        let printData = " ";
        let temp = " ";
        while(temp != this.first.nombre){
            printData+=aux.data();
            aux = aux.next;
            temp=aux.nombre;
        }
        return printData;
    }

    recorrido(baseInicio, horaInicio, minutoInicio, horaFin, minutoFin){
        let aux = this.found(baseInicio);
        let tStart= (horaInicio * 60) + minutoInicio;
        let tEnd = (horaFin * 60) + minutoFin;
        let tRoute = tStart;
        console.log(`Recorrido\nBase de inicio: ${aux.nombre} | Hora: ${Math.floor(tRoute / 60) + ':' + Math.floor(tRoute % 60)}`);
        while(tRoute <= tEnd){
            aux = aux.next
            tRoute += aux.minutos;
            console.log(`Recorrido\nBase de llegada: ${aux.nombre} | Hora: ${Math.floor(tRoute / 60) + ':' + Math.floor(tRoute % 60)}`);
        }
    }
}



class Rutas {
    constructor(nombre,minutos){
        this.nombre = nombre;
        this.minutos = minutos
    }

data(){
    return `El Nombre es: ${this.nombre}, 
            El Minuto es: ${this.minutos}, 
            </br>`;
    
}
}

let recorrido = new Ruta();
const addRecorrido = document.getElementById('BtnAdd');

addRecorrido.addEventListener('click',()=>{
    let nombre = document.getElementById('nombre').value;
    let minutos = document.getElementById('minutos').value;
    let recorridos = new Rutas(nombre, minutos);
    let saveRecorrido = recorrido.add(recorridos);
    document.getElementById('print').innerHTML = '<ul>La RUTA ha sido añadido con éxito!.</ul>'
})

const foundR = document.getElementById('BtnFound');

foundR.addEventListener('click',()=>{
    let ruta = document.getElementById('found-R').value;
    let rutaFound = recorrido.found(ruta);
    if(rutaFound){
        document.getElementById('print').innerHTML  = '<ul>La RUTA ha sido encontrado con éxito!.</ul>'
        document.getElementById('print').innerHTML += rutaFound.data();
    } else {
        document.getElementById('print').innerHTML  = '<ul>La RUTA no ha sido encontrado!.</ul>'
    }
})

const removeR = document.getElementById('BtnDelete');

removeR.addEventListener('click',()=>{
    let codigo = document.getElementById('found-R').value;
    recorrido.delete(codigo);
    document.getElementById('print').innerHTML = '<ul>La RUTA ha sido eliminado con éxito!.</ul>'
})

const imprimir = document.getElementById('BtnPrint');

imprimir.addEventListener('click',()=>{
    document.getElementById('print').innerHTML = '';
    document.getElementById('print').innerHTML += recorrido.prints();
})
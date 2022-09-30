;(function() {
    'use strict'

    var palabras = [
        'ALURA',
        'NIÑO',
        'AFINIDAD',
        'PROGRAMAR',
        'ORACLE',
        'YOUTUBE',
    ]

    var juego = null
    var finalizado = false

var $html = {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
}

function dibujar(juego) {
    var $elem
     $elem = $html.hombre
     var estado = juego.estado
     if (estado == 8) {
     estado = juego.previo
     }
     $elem.src = './imgs/estados/0' + estado + '.png'
     var palabra = juego.palabra
     var adivinado = juego.adivinado
     $elem = $html.adivinado
     $elem.innerHTML = ''
     for (let letra of palabra) {
        let $span = document.createElement('span')
        let $txt = document.createTextNode('')
        if (adivinado.indexOf(letra) >= 0) {
        $txt.nodeValue = letra
        }
     $span.setAttribute('class' , 'letra adivinada')
     $span.appendChild($txt)
     $elem.appendChild($span)
}

var errado = juego.errado
$elem = $html.errado
$elem.innerHTML = ''
for (let letra of errado) {
   let $span = document.createElement('span')
   let $txt = document.createTextNode(letra)
   $span.setAttribute('class' , 'letra errada')
    $span.appendChild($txt)
    $elem.appendChild($span)
}
}

function adivinar(juego, letra) {
    var estado = juego.estado
    if (estado == 1 || estado == 8) {
        return
    }
    var adivinado = juego.adivinado
    var errado = juego.errado
    if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
        return
    }
    var palabra = juego.palabra
    if (palabra.indexOf(letra) >= 0) {
        let ganado = true
     for (let l of palabra) {
     if (adivinado.indexOf(l) < 0 && l != letra) {
     ganado = false
     juego.previo = juego.estado
     break
     }
     }
     if (ganado) {
        juego.estado = 8
     }
     adivinado.push(letra)
    } else {
        juego.estado--
        errado.push(letra)
    }
}

window.onkeypress = function adivinarletra(e) {
    var letra = e.key
    letra = letra.toUpperCase()
    if (/[^A-ZÑ]/.test(letra)) {
        return
    }
    adivinar(juego, letra)
    var estado = juego.estado
    if (estado == 8 && !finalizado) {
        setTimeout(alertaGanado, 500)
        finalizado = true
    } else if (estado == 1 && !finalizado) {
        let palabra = juego.palabra
        let fn = alertaPerdido.bind(undefined, palabra)
       setTimeout(fn, 500)
       finalizado = true
    }
    dibujar(juego)
}

window.nuevoJuego = function nuevoJuego() {
  var palabra = palabraAleatoria()
  juego = {}
  juego.palabra = palabra
  juego.estado = 7
  juego.adivinado = []
  juego.errado = []
  finalizado = false
  dibujar(juego)
}

function palabraAleatoria () {
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
}

function alertaGanado() {
    alert('Felicidades, ganaste!')
}

function alertaPerdido(palabra) {
    alert('Lo siento, perdiste ... La palabra era: ' + palabra)
}

nuevoJuego()

}())

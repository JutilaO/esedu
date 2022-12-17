document.getElementById("lisaa").addEventListener("click", lisaa)
document.getElementById("poista").addEventListener("click", poista)
document.getElementById("jarjesta").addEventListener("click", jarjesta)
var kaverit = []

function lisaa(event){
    event.preventDefault()
    let kamu = document.querySelector("input").value
    if(kamu === "") return
    kaverit.push(kamu)
    document.getElementById("kaverilista").innerHTML = kaverit.join("</br>")
}

function poista(event){
    event.preventDefault()
    let kamu = document.querySelector("input").value
    if(kamu === "") return
    kaverit = kaverit.filter(function(item){
        return item !== kamu
    })
    if(kaverit.length <= 0){
        document.getElementById("kaverilista").innerHTML = "Ei kavereita :("
    } else {
        document.getElementById("kaverilista").innerHTML = kaverit.join("</br>")
    }
}

function jarjesta(event){
    event.preventDefault()
    kaverit = kaverit.sort()
    document.getElementById("kaverilista").innerHTML = kaverit.join("</br>")
}
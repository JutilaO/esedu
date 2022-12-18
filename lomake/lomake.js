document.getElementById("muu").addEventListener("change", (event) => salliYksiKielivalinta("muu"))
document.getElementById("suomi").addEventListener("change", (event) => salliYksiKielivalinta("suomi"))
document.getElementById("laheta").addEventListener("click", validointi)

function salliYksiKielivalinta(kieli){
    if(kieli === "muu"){
        document.getElementById("suomi").checked = false
    }
    if(kieli === "suomi"){
        document.getElementById("muu").checked = false
    }
}

function validointi(){
    var virheet = []
    if(!document.getElementById("id").value){
        virheet.push("Käyttäjä ID on pakollinen, vähintään 6 merkkiä")
    } else 
    if(document.getElementById("id").value.length < 6) virheet.push("Käyttäjä ID pitää olla vähintään 6 merkkiä")
    
    if(!document.getElementById("salasana").value) virheet.push("Salasana on pakollinen")
    if(!document.getElementById("nimi").value) virheet.push("Nimi on pakollinen")
    if(!document.getElementById("osoite").value) virheet.push("Osoite on pakollinen")
    if(document.getElementById("maa").value === "none") virheet.push("Maa on pakollinen")

    if(!document.getElementById("postinumero").value){
        virheet.push("Postinumero on pakollinen")
    } else
    if(document.getElementById("postinumero").value.length < 5){
        virheet.push("Postinumeron pitää olla 5 numeroa pitkä")
    } else
    if(isNaN(document.getElementById("postinumero").value)) virheet.push("Postinumeron voi sisältää vain numeroita")

    if(!document.getElementById("email").value){
        virheet.push("Sähköposti on pakollinen")
    } else {
        email = document.getElementById("email").value.toString()
        if(!email.endsWith(".com") && !email.endsWith(".fi")){
            virheet.push("Sähköpostin tulee päättyä .fi tai .com")
        } else {
            if(email.includes(".fi")) email = email.slice(0, email.lastIndexOf(".fi"))
            if(email.includes(".com")) email = email.slice(0, email.lastIndexOf(".com"))
            if(!email.includes("@")) virheet.push("Sähköpostin tulee sisältää @-merkki")
        }
    }

    if(document.getElementById("muu").checked === false && document.getElementById("suomi").checked === false) virheet.push("Kieli on pakollinen")

    if(virheet.length <= 0){
        document.getElementById("tulos").innerHTML = "Kiitos! Lomake lähetetty!"
    } else {
        document.getElementById("tulos").innerHTML = virheet.join("</br>")
    }
}
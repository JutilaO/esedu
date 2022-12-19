document.getElementById("kissa").addEventListener("click", lisaa)
data = {
    pats: 0,
    parkinson: 0,
    endurance: 0,
    chin: 0,
    mouse: 0,
    cheek: 0,
    pcp: 1,
    pps: 0
}

function lisaa(){
    data.pats += data.pcp
    document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
    document.getElementById("kissa").style.width = "10.1%"
    setTimeout(() => {
        document.getElementById("kissa").style.width = "10%"        
    }, 50);
}

var items = document.querySelectorAll("#shop tr")
for(i = 0; i < items.length; i++){
    items[i].addEventListener("click", function(){
        shop(this.innerHTML)
    })
}

function shop(item){
    list = item.replace(/td|=|"|\s/g, "")
    list = list.split("/")
    nimi = list[0]
    list[2] = list[2].toString()
    list[2] = list[2].replace(/><id/g, "")
    hinta = parseInt(list[2].slice((list[2].indexOf(">") + 1), list[2].indexOf("pats")))

    if(nimi.includes("Parkinson")){
        if(data.pats >= hinta && data.parkinson < 25){
            data.parkinson += 1
            data.pats -= hinta
            data.pps += 2
            document.getElementById("parkinson").innerHTML = data.parkinson
            document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
            document.getElementById("pps").innerHTML = `PPS: ${data.pps}`
            document.getElementById("parkinsonPrice").innerHTML = `${hinta + (hinta / 10)} pats`
            if(data.parkinson === 25){
                document.getElementById("parkinson").innerHTML = data.parkinson + " (max)"
            }
        }
    }
    if(nimi.includes("Endurance")){
        if(data.pats >= hinta && data.endurance < 25){
            data.endurance += 1
            data.pats -= hinta
            data.pps += 4
            document.getElementById("endurance").innerHTML = data.endurance
            document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
            document.getElementById("pps").innerHTML = `PPS: ${data.pps}`
            document.getElementById("endurancePrice").innerHTML = `${hinta + (hinta / 10)} pats`
            if(data.endurance === 25){
                document.getElementById("endurance").innerHTML = data.endurance + " (max)"
            }
        }
    }
    if(nimi.includes("Chin")){
        if(data.pats >= hinta && data.chin < 25){
            data.chin += 1
            data.pats -= hinta
            data.pps += 8
            document.getElementById("chin").innerHTML = data.chin
            document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
            document.getElementById("pps").innerHTML = `PPS: ${data.pps}`
            document.getElementById("chinPrice").innerHTML = `${hinta + (hinta / 10)} pats`
            if(data.chin === 25){
                document.getElementById("chin").innerHTML = data.chin + " (max)"
            }
        }
    }
    if(nimi.includes("Mouse")){
        if(data.pats >= hinta && data.mouse < 10){
            data.mouse += 1
            data.pcp = data.pcp * 2
            data.pats -= hinta
            document.getElementById("ppc").innerHTML = `Mouse double up (${data.pcp} PPC)`
            document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
            document.getElementById("mouse").innerHTML = data.mouse
            document.getElementById("mousePrice").innerHTML = `${hinta + ((hinta / 10) * 4)} pats`
            if(data.mouse === 10){
                document.getElementById("mouse").innerHTML = data.mouse + " (max)"
            }
        }
    }
    if(nimi.includes("Cheek")){
        if(data.pats >= hinta && data.cheek < 25){
            data.cheek += 1
            data.pats -= hinta
            data.pps += 100
            document.getElementById("cheek").innerHTML = data.cheek
            document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
            document.getElementById("pps").innerHTML = `PPS: ${data.pps}`
            document.getElementById("cheekPrice").innerHTML = `${hinta + (hinta / 10)} pats`
            if(data.cheek === 25){
                document.getElementById("cheek").innerHTML = data.cheek + " (max)"
            }
        }
    }

}

setInterval(() => {
    if(data.parkinson > 0 || data.endurance > 0 || data.chin > 0 || data.mouse > 0 || data.cheek > 0){
        data.pats += data.pps
        document.getElementById("pats").innerHTML = `Pats: ${data.pats}`
        document.getElementById("kissa").style.width = "10.1%"
        setTimeout(() => {
            document.getElementById("kissa").style.width = "10%"        
        }, 50);
    }
}, 1000);
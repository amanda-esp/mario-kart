const Mario = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0
};

const Peach = {
    NOME : "Peach",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 2,
    PONTOS : 0
};

const Yoshi = {
    NOME : "Yoshi",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 4,
    PODER : 3,
    PONTOS : 0
};

const Bowser = {
    NOME : "Bowser",
    VELOCIDADE : 5,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0
};

const DonkeyKong = {
    NOME : "DonkeyKong",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0
};

const Luigi = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock(){
    let type = Math.random()
    let roundBlock
    switch(true){
        case type < 0.33: roundBlock = "RETA➡️"
        break;
        case type < 0.66: roundBlock = "CURVA⤴️"
        break;
        default: roundBlock = "CONFRONTO🥊"
        break;
    }
    return roundBlock
};
async function getTypeConfront() {
    let type = Math.random()
    let confrontType
    if(type < 0.5)
        confrontType = "casco"
    else
        confrontType = "bomba"
    return confrontType
}
                                                                                                    
async function randomPowerUp() {
    let type = Math.random()
    let powerUp
    if(type < 0.5)        
        powerUp = true
    else
        powerUp = false
    return powerUp
}

async function powerConfront(character1, character2,powerPlayer1, powerPlayer2) {
    
    let confrontType = await getTypeConfront()
    let winner, loser, flag = false

    if(powerPlayer1 > powerPlayer2){
        winner = character1
        loser = character2
    }
    else if(powerPlayer2 > powerPlayer1){
        winner = character2
        loser = character1
    }
    else{
        console.log("EMPATE! Nenhum ponto foi perdido!")
        flag = true
    }   
    
    if(!flag){
        if(confrontType === "casco"){
            console.log("Tipo de confronto: Casco 🐢")
            console.log(`${winner.NOME} venceu o confronto e ${loser.NOME} perdeu 1 ponto!`)
            loser.PONTOS > 0 ? loser.PONTOS-- : ""
        }else{
            console.log("Tipo de confronto: Bomba 💣")
            console.log(`${winner.NOME} venceu o confronto e ${loser.NOME} perdeu 2 pontos!`)
            loser.PONTOS > 1 ? loser.PONTOS -= 2 : loser.PONTOS = 0
        }

        let powerUp = await randomPowerUp()
        if(powerUp){
            console.log(`\n${winner.NOME} está com sorte e ganhou um turbo! +1 ponto`)
            winner.PONTOS++
        }
    }

    
}

async function rollResult(character, block, diceResult,value) {
    console.log(`${character} rolou um dado de ${block} valor ${diceResult} + ${value} = ${diceResult+value}`)
}

async function playRaceEngine(character1, character2) {
    for(let i=1;i<=5;i++){
        let block = await getRandomBlock()
        console.log(`🏁Rodada ${i}: Tipo ${block}`)
        
        let dicePlayer1 = await rollDice()
        let dicePlayer2 = await rollDice()
        let totalPlayer1  
        let totalPlayer2
        

        if(block === "RETA➡️"){
            await rollResult(character1.NOME,"velocidade",dicePlayer1,character1.VELOCIDADE)
            await rollResult(character2.NOME,"velocidade",dicePlayer2,character2.VELOCIDADE)
            console.log("")
            totalPlayer1 = dicePlayer1 + character1.VELOCIDADE
            totalPlayer2 = dicePlayer2 + character2.VELOCIDADE
            
        } else if (block === "CURVA⤴️"){
            await rollResult(character1.NOME,"manobrabilidade",dicePlayer1,character1.MANOBRABILIDADE)
            await rollResult(character2.NOME,"manobrabilidade",dicePlayer2,character2.MANOBRABILIDADE)
            console.log("")
            totalPlayer1 = dicePlayer1 + character1.MANOBRABILIDADE
            totalPlayer2 = dicePlayer2 + character2.MANOBRABILIDADE
        } else {
            console.log(`Confronto entre ${character1.NOME} e ${character2.NOME}!\n`)
            
            await rollResult(character1.NOME,"poder",dicePlayer1,character1.PODER)
            await rollResult(character2.NOME,"poder",dicePlayer2,character2.PODER)
            console.log("")
            let powerPlayer1 = dicePlayer1 + character1.PODER
            let powerPlayer2 = dicePlayer2 + character2.PODER
            
            await powerConfront(character1, character2,powerPlayer1, powerPlayer2)
        }

        if(totalPlayer1 > totalPlayer2){
            console.log(`${character1.NOME} ganhou + 1 ponto!`)
            character1.PONTOS++;
        }
        else if(totalPlayer2 > totalPlayer1){
            console.log(`${character2.NOME} ganhou + 1 ponto!`)
            character2.PONTOS++;
        }
             
        console.log("=======================================================")

    }
    await declareWinner(character1,character2)
}

async function declareWinner(character1,character2) {
    console.log("RESULTADO FINAL\n")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)\n`)

    if(character1.PONTOS > character2.PONTOS)
        console.log(`${character1.NOME} é o/a vencedor/a!🏆\n`)
    else if (character1.PONTOS < character2.PONTOS)
        console.log(`${character2.NOME} é o/a vencedor/a!🏆\n`)
    else
        console.log(`A partida terminou em empate!!\n`)
}

//Auto invoke function: a função irá executar toda vez q o arquivo for chamado
(async function main(){
    console.log("=======================================================")
    console.log("   🏁🚩 Bem-vindos a corrida de Mario Kart 🚩🏁")
    console.log("=======================================================\n")
    console.log("Escolha os competidores:\n")
    console.log("1 - Mario\n\tVelocidade: 4\n\tManobrabilidade: 3\n\tPoder: 3\n")
    console.log("2 - Peach\n\tVelocidade: 3\n\tManobrabilidade: 4\n\tPoder: 2\n")
    console.log("3 - Yoshi\n\tVelocidade: 3\n\tManobrabilidade: 3\n\tPoder: 4\n")
    console.log("4 - Bowser\n\tVelocidade: 5\n\tManobrabilidade: 2\n\tPoder: 5\n")
    console.log("5 - DonkeyKong\n\tVelocidade: 2\n\tManobrabilidade: 2\n\tPoder: 5\n")
    console.log("6 - Luigi\n\tVelocidade: 3\n\tManobrabilidade: 4\n\tPoder: 2\n")
    const prompt = require('prompt-sync')();
    let player1, player2, choice1, choice2
    do{
        choice1 = prompt("Jogador 1: ")
        switch(choice1){
            case "1": player1 = Mario
            break;
            case "2": player1 = Peach
            break;
            case "3": player1 = Yoshi
            break;
            case "4": player1 = Bowser
            break;
            case "5": player1 = DonkeyKong
            break;
            case "6": player1 = Luigi
            break;
            default: console.log("Escolha inválida para jogador 1, tente novamente!")
            break;
        }
    }while(!player1)
    do{
        do{
            choice2 = prompt("Jogador 2: ")
            if(choice1 === choice2)
            console.log("Jogadores não podem escolher o mesmo personagem, tente novamente!")
        }while(choice1 === choice2)
        
        switch(choice2){
            case "1": player2 = Mario
            break;
            case "2": player2 = Peach
            break;
            case "3": player2 = Yoshi
            break;
            case "4": player2 = Bowser
            break;
            case "5": player2 = DonkeyKong
            break;
            case "6": player2 = Luigi
            break;
            default: console.log("Escolha inválida para jogador 2, tente novamente!")
            break;
        }
    }while(!player2)
    console.log("=======================================================")
    console.log(`   🏁🚩 Corrida entre ${player1.NOME} e ${player2.NOME} começando 🚩🏁`)
    console.log("=======================================================\n")
    await playRaceEngine(player1,player2)
})();

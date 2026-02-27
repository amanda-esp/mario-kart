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

//função assíncrona: não irá sempre, é possível pausar
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
            totalPlayer1 = dicePlayer1 + character1.VELOCIDADE
            totalPlayer2 = dicePlayer2 + character2.VELOCIDADE
            
        } else if (block === "CURVA⤴️"){
            await rollResult(character1.NOME,"manobrabilidade",dicePlayer1,character1.MANOBRABILIDADE)
            await rollResult(character2.NOME,"manobrabilidade",dicePlayer2,character2.MANOBRABILIDADE)
            totalPlayer1 = dicePlayer1 + character1.MANOBRABILIDADE
            totalPlayer2 = dicePlayer2 + character2.MANOBRABILIDADE
        } else {
            console.log(`Confronto entre ${character1.NOME} e ${character2.NOME}!`)
            let powerPlayer1 = dicePlayer1 + character1.PODER
            let powerPlayer2 = dicePlayer2 + character2.PODER
            await rollResult(character1.NOME,"poder",dicePlayer1,character1.PODER)
            await rollResult(character2.NOME,"poder",dicePlayer2,character2.PODER)
            if(powerPlayer1 > powerPlayer2){
                console.log(`${character1.NOME} venceu a rodada! ${character2.NOME} perde 1 ponto`)
                character2.PONTOS > 0 ? character2.PONTOS-- : ""
            }else if(powerPlayer2 > powerPlayer1){
                console.log(`${character2.NOME} venceu a rodada! ${character1.NOME} perde 1 ponto`)
                character1.PONTOS > 0 ? character1.PONTOS-- : ""
            }else
                console.log("EMPATE! Nenhum ponto foi perdido!")
        }

        if(totalPlayer1 > totalPlayer2){
            console.log(`${character1.NOME} ganhou + 1 ponto!`)
            character1.PONTOS++;
        }
        if(totalPlayer2 > totalPlayer1){
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
        console.log(`${character1.NOME} é o vencedor!🏆\n`)
    else if (character1.PONTOS < character2.PONTOS)
        console.log(`${character2.NOME} é o vencedor!🏆\n`)
    else
        console.log(`A partida terminou em empate!!\n`)
}

//Auto invoke function: a função irá executar toda vez q o arquivo for chamado
(async function main(){
    console.log("")
    console.log("=======================================================")
    console.log(`   🏁🚩 Corrida entre ${player1.NOME} e ${player2.NOME} começando 🚩🏁`)
    console.log("=======================================================\n")
    await playRaceEngine(player1,player2)
})();

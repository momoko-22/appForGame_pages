//const fs = require('fs')

function sortTimestamp(array) {
    array.sort(function(a,b){
        if(a.timestamp < b.timestamp) return -1;
        if(a.timestamp > b.timestamp) return 1;
        return 0;
    });
    return array
}

const timeline_first_time = 1299794404 //全投稿で一番早い時間
// const timeline_first_time = 1299822360 //最初の画像入りテキストの時間
let times = 50 //時間経過何倍するか設定 

function displayCard_gamemaster(array, classname, start_time, diff) {
    console.log(times)
    
    //newsクラスの１番上に表示されているidを取得
    //本当はgetElementしたかったけど、子要素が全然取ってこれなかったのでのでとりあえずSessionStorageを使用
    const displayedLastId = sessionStorage.getItem('displayedLastId_gamemaster')

    if (displayedLastId == -1) {
        start_i = 0
    } else {
        start_i = Number(displayedLastId.substring(10)) + 1
    }
     
    const contents = sortTimestamp(array)

    const sec = ((Date.now() - start_time) / 1000 - diff) * times

    for (i = start_i; i < contents.length; i++) {
        const content = contents[i]
        if (content.timestamp > 1299822360) {
            times = 12
        }
        if (sec < (content.timestamp - timeline_first_time)) {
            sessionStorage.setItem('displayedLastId_gamemaster',contents[i-1].id)
            break
        }

        if (i == start_i) {
            $('.toast').toast({ delay: 6000 }).toast('show')
            const gamemaster = document.getElementById('gamemaster')
            const newtext = gamemaster.getElementsByClassName('text-danger')
            const len = newtext.length
            for (k = 0; k < len; k++){
                newtext[0].remove()
            }
        }

        //カード文の設定
        const newText = document.createElement('small')
        const newContent = document.createTextNode('new ')
        newText.appendChild(newContent)
        newText.setAttribute('class', 'text-danger')
        const TextBody = document.createElement('p')
        TextBody.appendChild(newText)
        TextBody.setAttribute('class', "card-text")

        const Content = document.createTextNode(content.text)
        TextBody.appendChild(Content)
        TextBody.setAttribute('class', "card-text")

        const dt = new Date(content.timestamp * 1000)
        const timestamp = dt.toLocaleString()
        const newSmallText = document.createElement('small')
        const newSmallContent = document.createTextNode(timestamp)
        newSmallText.appendChild(newSmallContent)
        newSmallText.setAttribute('class', 'text-muted')
        const newSmallTextBody = document.createElement('p')
        newSmallTextBody.appendChild(newSmallText)
        newSmallTextBody.setAttribute('class', "card-text")

        const newid = document.createElement('p')
        const idContent = document.createTextNode(content.id) 
        newid.appendChild(idContent)
        newid.setAttribute('hidden','')

        const newCardBody = document.createElement("div") 
        newCardBody.appendChild(TextBody)
        //newCardBody.appendChild(newlink)
        newCardBody.appendChild(newSmallTextBody)
        newCardBody.appendChild(newid)
        newCardBody.setAttribute('class', "card-body")

        const newCard = document.createElement('div')
        newCard.appendChild(newCardBody)
        newCard.setAttribute('class','card')

        const parentDiv = document.getElementById(classname)
        parentDiv.prepend(newCard)
    } 
}

function displayCard_news(array, classname, start_time, diff){
    
    //newsクラスの１番上に表示されているidを取得
    //本当はgetElementしたかったけど、子要素が全然取ってこれなかったのでのでとりあえずSessionStorageを使用
    const displayedLastId = sessionStorage.getItem('displayedLastId_news')

    if (displayedLastId == -1) {
        start_i = 0
    } else {
        start_i = Number(displayedLastId.substring(4)) + 1
    }
     
    const contents = sortTimestamp(array)

    const sec = ((Date.now() - start_time) / 1000 - diff) * times

    for (i = start_i; i < contents.length; i++) {
        const content = contents[i]

        if (sec < (content.timestamp - timeline_first_time)) {
            sessionStorage.setItem('displayedLastId_news',contents[i-1].id)
            break
        }

        if (i == start_i) {
            const news = document.getElementById('news')
            const newtext = news.getElementsByClassName('text-danger')
            const len = newtext.length
            for (k = 0; k < len; k++){
                newtext[0].remove()
            }
        }

        //画像の設定
        const newImg = document.createElement('img')
        const imgcol = document.createElement('div')
        console.log(content.imgurl)
        if (content.img != '') {
            newImg.src = content.imgurl
            newImg.setAttribute('width', '100%')
            newImg.setAttribute('class', 'bd-placeholder-img')

            imgcol.setAttribute('class', 'col-md-4')
            imgcol.appendChild(newImg)
        }
        //カード文の設定
        const newText = document.createElement('small')
        const newContent = document.createTextNode('new ')
        newText.appendChild(newContent)
        newText.setAttribute('class', 'text-danger')
        const TextBody = document.createElement('p')
        TextBody.appendChild(newText)
        TextBody.setAttribute('class', "card-text")


        const Content = document.createTextNode(content.text)
        TextBody.appendChild(Content)
        TextBody.setAttribute('class', "card-text")

        const dt = new Date(content.timestamp * 1000)
        const timestamp = dt.toLocaleString()
        const newSmallText = document.createElement('small')
        const newSmallContent = document.createTextNode(timestamp)
        newSmallText.appendChild(newSmallContent)
        newSmallText.setAttribute('class', 'text-muted')
        const newSmallTextBody = document.createElement('p')
        newSmallTextBody.appendChild(newSmallText)
        newSmallTextBody.setAttribute('class', "card-text")

        const Button = document.createElement('a')
        Button.href = '#'
        Button.appendChild(document.createTextNode('クリップ'))
        Button.setAttribute('class', 'btn btn-primary')
        Button.addEventListener('click', clip)

        const newid = document.createElement('p')
        const idContent = document.createTextNode(content.id) 
        newid.appendChild(idContent)
        newid.setAttribute('hidden','')

        const newCardBody = document.createElement("div") 
        //newCardBody.appendChild(newTextBody)
        newCardBody.appendChild(TextBody)
        //newCardBody.appendChild(newlink)
        newCardBody.appendChild(newSmallTextBody)
        newCardBody.appendChild(Button)
        newCardBody.appendChild(newid)
        newCardBody.setAttribute('class', "card-body")

        const cardcol = document.createElement('div')
        cardcol.appendChild(newCardBody)
        cardcol.setAttribute('class','col-md-8')

        //画像とcardbodyを結合
        const newRow = document.createElement('div')
        newRow.appendChild(cardcol)
        if (content.img != '') { newRow.appendChild(imgcol) }
        newRow.setAttribute('class', 'row no-gutters')

        const newCard = document.createElement('div')
        newCard.appendChild(newRow)
        newCard.setAttribute('class', 'card mb-3')

        const parentDiv = document.getElementById(classname)
        parentDiv.prepend(newCard)
    } 
}
function displayCard_tweets(array, classname, start_time, diff) {
    
    //newsクラスの１番上に表示されているidを取得
    //本当はgetElementしたかったけど、子要素が全然取ってこれなかったのでのでとりあえずSessionStorageを使用
    const displayedLastId = sessionStorage.getItem('displayedLastId_tweets')

    if (displayedLastId == -1) {
        start_i = 0
    } else {
        start_i = Number(displayedLastId.substring(6)) + 1
    }
    const contents = sortTimestamp(array)

    const sec = ((Date.now() - start_time) / 1000 - diff) * times

    for (i = start_i; i < contents.length; i++) {
        const content = contents[i]

        if (sec < (content.timestamp - timeline_first_time)) {
            sessionStorage.setItem('displayedLastId_tweets',contents[i-1].id)
            break
        }

        if (i == start_i) {
            const tweets = document.getElementById('tweets')
            const newtext = tweets.getElementsByClassName('text-danger')
            const len = newtext.length
            for (k = 0; k < len; k++){
                newtext[0].remove()
            }
        }

        const newText = document.createElement('small')
        const newContent = document.createTextNode('new ')
        newText.appendChild(newContent)
        newText.setAttribute('class', 'text-danger')
        const TextBody = document.createElement('p')
        TextBody.appendChild(newText)
        TextBody.setAttribute('class', "card-text")

        const Content = document.createTextNode(content.text)
        TextBody.appendChild(Content)
        TextBody.setAttribute('class', "card-text")

        const dt = new Date(content.timestamp * 1000)
        const timestamp = dt.toLocaleString()
        const newSmallText = document.createElement('small')
        const newSmallContent = document.createTextNode(timestamp)
        newSmallText.appendChild(newSmallContent)
        newSmallText.setAttribute('class', 'text-muted')
        const newSmallTextBody = document.createElement('p')
        newSmallTextBody.appendChild(newSmallText)
        newSmallTextBody.setAttribute('class', "card-text")

        const Button = document.createElement('a')
        Button.href = '#'
        Button.appendChild(document.createTextNode('クリップ'))
        Button.setAttribute('class', 'btn btn-primary')
        Button.addEventListener('click', clip)

        const newid = document.createElement('p')
        const idContent = document.createTextNode(content.id) 
        newid.appendChild(idContent)
        newid.setAttribute('hidden','')

        const newCardBody = document.createElement("div") 
        //newCardBody.appendChild(newTextBody)
        newCardBody.appendChild(TextBody)
        //newCardBody.appendChild(newlink)
        newCardBody.appendChild(newSmallTextBody)
        newCardBody.appendChild(Button)
        newCardBody.appendChild(newid)
        newCardBody.setAttribute('class', "card-body")

        const newCard = document.createElement('div')
        newCard.appendChild(newCardBody)
        newCard.setAttribute('class','card')

        const parentDiv = document.getElementById(classname)
        parentDiv.prepend(newCard)
    } 
}


function displayCard_clips(array, classname) {
    $('#'+classname).empty()
     
    const contents = sortTimestamp(array)

    for (i = 0; i < contents.length; i++) {
        const content = contents[i]
        const newTextBody = document.createElement('p')
        const newContent = document.createTextNode(content.text)
        newTextBody.appendChild(newContent)
        newTextBody.setAttribute('class', "card-text")

        const dt = new Date(content.timestamp * 1000)
        const timestamp = dt.toLocaleString()
        const newSmallText = document.createElement('small')
        const newSmallContent = document.createTextNode(timestamp)
        newSmallText.appendChild(newSmallContent)
        newSmallText.setAttribute('class', 'text-muted')
        const newSmallTextBody = document.createElement('p')
        newSmallTextBody.appendChild(newSmallText)
        newSmallTextBody.setAttribute('class', "card-text")

        const Button = document.createElement('a')
        Button.href = '#'
        Button.appendChild(document.createTextNode('クリップから削除'))
        Button.setAttribute('class', 'btn btn-secondary')
        Button.addEventListener('click', deleteClip)

        const newid = document.createElement('p')
        const idContent = document.createTextNode(content.id) 
        newid.appendChild(idContent)
        newid.setAttribute('hidden','')

        const newCardBody = document.createElement("div") 
        newCardBody.appendChild(newTextBody)
        //newCardBody.appendChild(newlink)
        newCardBody.appendChild(newSmallTextBody)
        newCardBody.appendChild(Button)
        newCardBody.appendChild(newid)
        newCardBody.setAttribute('class', "card-body")

        const newCard = document.createElement('div')
        newCard.appendChild(newCardBody)
        newCard.setAttribute('class','card')

        const parentDiv = document.getElementById(classname)
        //parentDiv.setAttribute('style','width: 40rem;')
        parentDiv.prepend(newCard)
    } 
}

function clip(event) {
    let text = event.target.parentNode.children[0].textContent
    console.log(text.indexOf('new'))
    if (text.indexOf('new') == 0) {
        text = text.substring(3)
    }
    const datetime = event.target.parentNode.children[1].textContent
    const id = event.target.parentNode.children[3].textContent
    const postdt = Date.parse(datetime) / 1000
    const clipdt = Date.now()
    const addobj = { 'id': id, 'text': text, 'timestamp': postdt,'clipTimestamp':clipdt}
    let clips = JSON.parse(sessionStorage.getItem('clips'))
    if (clips == null) {
        clips = []
    }
    clips.push(addobj)
    sessionStorage.setItem('clips', JSON.stringify(clips))

    //クリップボタンを非表示にする
    const button = event.target.parentNode.children[2]
    button.setAttribute('hidden','') 
    displayCard_clips(clips, "clips")
    
}

function deleteClip(event) {
    let clips = JSON.parse(sessionStorage.getItem('clips'))
    const id = event.target.parentNode.children[3].textContent
    clips.forEach((clip,idx) => {
        if (clip.id == id) {
            clips.splice(idx,1)
        }
    })
    sessionStorage.setItem('clips', JSON.stringify(clips))
    displayCard_clips(clips,'clips')
}

function restartButtonClick(event) {
    console.log('button')
    console.log(event.target)
    let newsTimerID = sessionStorage.getItem('newsTimerID')
    let tweetsTimerID = sessionStorage.getItem('tweetsTimerID')
    let gamemasterTimerID = sessionStorage.getItem('gamemasterTimerID')
    if (newsTimerID == 0) {
        event.target.innerText = 'タイムライン一時停止' 
        const stoptime = sessionStorage.getItem('stoptime')
        const addDiff = (Date.now() - stoptime) / 1000
        diff += addDiff
        const newsContents = JSON.parse(sessionStorage.getItem('news'))
        const tweetsContents = JSON.parse(sessionStorage.getItem('tweets'))
        const gamemasterContents = JSON.parse(sessionStorage.getItem('gamemaster'))
        newsTimerID = setInterval(displayCard_news, 1000,newsContents,"news",starttime,diff)
        tweetsTimerID = setInterval(displayCard_tweets, 1000,tweetsContents,"tweets",starttime,diff)
        gamemasterTimerID = setInterval(displayCard_gamemaster, 1000,gamemasterContents,"gamemaster",starttime,diff)
        sessionStorage.setItem('newsTimerID',newsTimerID)
        sessionStorage.setItem('tweetsTimerID',tweetsTimerID)
        sessionStorage.setItem('gamemasterTimerID',gamemasterTimerID)
    } else {
        event.target.innerText = 'タイムライン再生' 
        const stoptime = Date.now()
        sessionStorage.setItem('stoptime', stoptime)
        clearInterval(newsTimerID)
        clearInterval(tweetsTimerID)
        clearInterval(gamemasterTimerID)
        sessionStorage.setItem('newsTimerID',0)
        sessionStorage.setItem('tweetsTimerID',0)
        sessionStorage.setItem('gamemasterTimerID',0)
    }
}

const starttime = Date.now()
let diff = 0
sessionStorage.setItem('starttime',starttime)
$.ajax({
    // 読み込みの設定
    type: "GET",
    url: "news.json", // ファイルパス（相対パス）
    dataType: "json", // ファイル形式
    async: false // 非同期通信フラグ
}).then(
    function (json) {
        const cardContents = []
        // 読み込み成功時の処理
        console.log("読み込みに成功しました");
        json.forEach((post,idx) => {
            const timestamp = post['timestamp']
            const url = 'url'
            const text = post['text']
            const imgurl = post['imgurl']
            cardContents.push({ 'id': 'news' + idx, 'timestamp': timestamp, 'text': text, 'imgurl': imgurl }) 
        })
        sessionStorage.setItem('news', JSON.stringify(cardContents))
        sessionStorage.setItem('displayedLastId_news', -1)
        const newsTimerID = setInterval(displayCard_news, 1000,cardContents,"news",starttime,0)
        sessionStorage.setItem('newsTimerID',newsTimerID)
    },
    function () {
        // 読み込み失敗時の処理
        console.log("読み込みに失敗しました");
    }
)


$.ajax({
    // 読み込みの設定
    type: "GET",
    url: "tweets.json", // ファイルパス（相対パス）
    dataType: "json", // ファイル形式
    async: false // 非同期通信フラグ
}).then(
    function (json) {
        const cardContents = []
        // 読み込み成功時の処理
        console.log("読み込みに成功しました");
        json.forEach((post,idx) => {
            const timestamp = post['timestamp']
            const url = 'url'
            const text = post['text']
            cardContents.push({ 'id':'tweets'+idx,'timestamp': timestamp, 'text': text}) 
        })
        sessionStorage.setItem('tweets', JSON.stringify(cardContents))
        sessionStorage.setItem('displayedLastId_tweets', -1)
        const tweetsTimerID = setInterval(displayCard_tweets, 1000,cardContents,"tweets",starttime,0)
        sessionStorage.setItem('tweetsTimerID',tweetsTimerID)
    },
    function () {
        // 読み込み失敗時の処理
        console.log("読み込みに失敗しました");
    } 
)


$.ajax({
    // 読み込みの設定
    type: "GET",
    url: "gamemaster.json", // ファイルパス（相対パス）
    dataType: "json", // ファイル形式
    async: false // 非同期通信フラグ
}).then(
    function (json) {
        const cardContents = []
        // 読み込み成功時の処理
        console.log("読み込みに成功しました");
        json.forEach((post,idx) => {
            const timestamp = post['timestamp']
            const url = 'url'
            const text = post['text']
            cardContents.push({ 'id':'gamemaster'+idx,'timestamp': timestamp, 'text': text}) 
        })
        sessionStorage.setItem('gamemaster', JSON.stringify(cardContents))
        sessionStorage.setItem('displayedLastId_gamemaster', -1)
        const gamemasterTimerID = setInterval(displayCard_gamemaster, 1000, cardContents, "gamemaster", starttime, 0)
        sessionStorage.setItem('gamemasterTimerID',gamemasterTimerID)
    },
    function () {
        // 読み込み失敗時の処理
        console.log("読み込みに失敗しました");
    } 
)

sessionStorage.removeItem('clips')
const clips = JSON.parse(sessionStorage.getItem('clips'))
displayCard_clips(clips, "clips")



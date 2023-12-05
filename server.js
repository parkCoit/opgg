const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const port = '4000'

const api_key = 'RGAPI-1266dee3-8228-4a43-8070-856e3d8077be'

app.get('/summoner/kr/summoner', async (req, res) => {
    const { data } = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Hide%20on%20bush/KR1?api_key=${api_key}`)
    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

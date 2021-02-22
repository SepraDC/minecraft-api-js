const express = require('express');
const router = express.Router();
const { MinecraftServerListPing } = require("minecraft-status");

/* GET users listing. */
router.get('/:host/:port?', function(req, res) {
    const host = req.params.host;
    const port = req.params.port ? req.params.port : 25565;

    const players = (players) => {
        players.forEach((player) => {
            player.skin = "https://crafatar.com/avatars/" + player.id;
        })
        return players;
    }

    const extraToHtml = (extras = []) => {
        let html = "";
        extras.forEach(element => {
            html += (element.text.startsWith('\n')) ? "<br/>" : ""
            html += "<span style='";
            html += (element.bold) ? "font-weight: bold;" : "";
            html += (element.italic) ? "font-style: italic;": "";
            html += (element.underlined) ? "text-decoration: underline;": "";
            html += (element.color) ? "color:"+element.color+";":"";
            html += "'>"+ element.text + "</span>"
        })
        return html
    }

    MinecraftServerListPing.ping(4, host, port, 3000)
        .then(response => {
            res.json({
                'hostname': host,
                'port': port,
                'version': response.version.name,
                'players': {
                    'max': response.players.max,
                    'online': response.players.online,
                    'sample': (response.players.sample) ? players(response.players.sample) : []
                },
                'description': extraToHtml(response.description.extra),
                'online': true
            })
        })
        .catch(error => {
            res.json({
                'error': error
            })
        });
});

module.exports = router;

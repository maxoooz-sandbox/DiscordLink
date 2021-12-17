/**
 * @name DiscordLink
 * @version 1.0.0-Alpha
 * @description DiscordLink allows you to link your position on a minecraft server to a discord voice. The sound changes according to the distance to the nearest players.
 * @author MaXoooZ
 */

const volumeList = {
	0: 199.52623149688796,  // 200
	1: 195.43394557753948,  // 197
	2: 191.42559250210854,  // 194
	3: 187.4994508067419,  // 191
	4: 183.65383433483464,  // 188
	5: 179.88709151287878,  // 185
	6: 176.1976046411629,  // 182
	7: 173.7800828749376,  // 180
	8: 170.21585083949506,  // 177
	9: 166.72472125510626,  // 174
	10: 163.30519478943344, // 171
	11: 159.95580286146688, // 168
	12: 156.6751070108149, // 165
	13: 153.46169827992944, // 162
	14: 151.35612484362082, // 160
	15: 148.25180851459535, // 157
	16: 145.2111617587742, // 154
	17: 142.23287871228197, // 151
	18: 139.3156802945303, // 148
	19: 136.45831365889248, // 145
	20: 133.65955165464422, // 142
	21: 131.82567385564073, // 140
	22: 129.1219273613534, // 137
	23: 126.47363474711514, // 134
	24: 123.87965865303691, // 131
	25: 121.33888504649772, // 128
	26: 118.85022274370185, // 125
	27: 116.41260294104913, // 122
	28: 114.81536214968828, // 120
	29: 112.46049739669263, // 117
	30: 110.1539309541415, // 114
	31: 107.89467222298288, // 111
	32: 105.68175092136585, // 108
	33: 103.51421666793439, // 105
	34: 101.39113857366794, // 102
	35: 100, // 100
	36: 84.1395141645195, // 97
	37: 70.7945784384138, // 94
	38: 59.56621435290105, // 91
	39: 50.11872336272722, // 88
	40: 42.16965034285822, // 85
	41: 35.48133892335755, // 82
	42: 31.622776601683793, // 80
	43: 26.6072505979881, // 77
	44: 22.387211385683393, // 74
	45: 18.836490894898006, // 71
	46: 15.848931924611131, // 68
	47: 13.33521432163324, // 65
	48: 11.220184543019636, // 62
	49: 10, // 60
	50: 8.413951416451948, // 57
	51: 7.07945784384138, // 54
	52: 5.956621435290104, // 51
	53: 5.011872336272723, // 48
	54: 4.216965034285822, // 45
	55: 3.548133892335755, // 42
	56: 3.162277660168379, // 40
	57: 2.6607250597988097, // 37
	58: 2.23872113856834, // 34
	59: 1.8836490894898001, // 31
	60: 1.5848931924611134, // 28
	61: 1.333521432163324, // 25
	62: 1.1220184543019636, // 22
	63: 1, // 20
	64: 0.8413951416451947, // 17
	65: 0.707945784384138, // 14
	66: 0.5956621435290103, // 11
	67: 0.5011872336272725, // 8
	68: 0.4216965034285823, // 5
	69: 0.3548133892335753, // 2 
	70: 0, // 0 
	71: 0  // 0
}

const userID = BdApi.findModuleByProps("getId").getId();
const request = require("request");

const api = "localhost";
let list;

module.exports = class DiscordLink {
	start() {
        sendReq();
	}

	stop() {
	}
};

function sendReq() {
	request("http://" + api + "/api/list", async function (err, res, body) {
		if (err) {					
			setTimeout(() => {
				sendReq();
			}, 1000 * 30);

			return;
		} else if (body.includes(userID)) {
			list = JSON.parse(body);
			await getPlayers();
		}

		setTimeout(() => {
			sendReq();
		}, 1000 * 0.5);
	});
}

function getPlayers() {
	const userXYZ = list[userID].split(":");

	for (const player in list) {
		if (player === userID) continue;

		const xyz = list[player].split(":");
		const volume = getVolume(userXYZ, xyz);

		BdApi.findModuleByProps("setLocalVolume").setLocalVolume(player, volume)
	}
}

function getVolume(userXYZ, xyz) {
	const distance = Math.floor(
		Math.sqrt(
			((userXYZ[0] - xyz[0]) ** 2) + 
			((userXYZ[1] - xyz[1]) ** 2) + 
			((userXYZ[2] - xyz[2]) ** 2)
		)
	);

	if (distance > 70) return volumeList[70];
	return volumeList[distance];
}
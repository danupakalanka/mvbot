
const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType,
	jidDecode
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { state, saveState } = useSingleFileAuthState('./session.json')
const config = require('./config')
const prefix = '.'
const owner = ['761327688']
const axios = require('axios')
const connectToWA = () => {
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state,
	})

	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
				connectToWA()
			}
		} else if (connection === 'open') {
			console.log('Bot Connected')
		}
	})

	conn.ev.on('creds.update', saveState)

	conn.ev.on('messages.upsert', async (mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return

			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid

			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId ? mek.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''


			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''

			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'Sin Nombre'

			const isMe = botNumber.includes(senderNumber)
			const isowner = owner.includes(senderNumber) || isMe

			const reply = (teks) => {
				conn.sendMessage(from, { text: teks }, { quoted: mek })
			}

			const isSUB = from == config.SENDJID ? true : false

			switch (command) {

				//......................................................Commands..............................................................\\

				case '6-underground-2019':
				case '6underground': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/6_Underground_2019_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro 6 underground 2019 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case '12-strong-2018':
				case '12strong': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/12_Strong_2018_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro 12 Strong 2018 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'a-wrinkle-in-time-2018':
				case 'awrinkleintime': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/A_Wrinkle_In_Time_2018_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro A Wrinkle In Time 2018 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'after':
				case 'after-2019':
				case 'after-we-collided-2020':
				case 'after-we-fell-2021': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/After_2019_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro After 2019 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/After_We_Collided_2020_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro After We Collided 2020 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/After_We_Fell_2021_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro After We Fell 2021 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'alienvspredator':
				case 'alien-vs-predator-2004':
				case 'aliens-vs-predator-requiem-2007': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Alien_Vs_Predator_2004_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Alien Vs Predator 2004 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Aliens_Vs_Predator_Requiem_2007_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Aliens Vs Predator Requiem 2007 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'aliens-in-the-attic-2009':
				case 'aliensintheattic': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Aliens_In_The_Attic_2009_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Aliens In The Attic 2009 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'americanpie':
				case 'american-pie-1999':
				case 'american-pie-2001':
				case 'american-pie-the-wedding-2003':
				case 'american-pie-presents-band-camp-2005':
				case 'american-pie-presents-the-naked-mile-2006':
				case 'american-pie-presents-beta-house-2007':
				case 'american-pie-presents-the-book-of-love-2009':
				case 'american-pie-reunion-2012':
				case 'american-pie-presents-girls-rules-2020': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_1999_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie 1999 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_2001_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie 2001 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_The_Wedding_2003_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie The Wedding 2003 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_Presents_Band_Camp_2005_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie Presents Band Camp 2005 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_Presents_The_Naked_Mile_2006_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie Presents The Naked Mile 2006 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_Presents_Beta_House_2007_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie Presents Beta House 2007 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_Presents_The_Book_Of_Love_2009_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie Presents The Book Of Love 2009 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_Reunion_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie Reunion 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/American_Pie_Presents_Girls_Rules_2020_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro American Pie Presents Girls Rules 2020 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'angrybirds':
				case 'the-angry-birds-movie-2016':
				case 'the-angry-birds-movie-2019': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/The_Angry_Birds_Movie_2016_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro The Angry Birds Movie 2016 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/The_Angry_Birds_Movie_2019_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro The Angry Birds Movie 2019 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'antman':
				case 'ant-man-and-the-wasp-2018': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Ant_Man_And_The_Wasp_2018_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Ant Man And The Wasp 2018 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'artemis-fowl-2020':
				case 'artemisfowl': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Artemis_Fowl_2020_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Artemis Fowl 2020 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'assassinscreed':
				case 'assassins-creed-2016': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: "https://cloud.nadith.pro/en_mv/Assassin's_Creed_2016_@nadithpro.mkv" },
						mimetype: config.MKVTYPE,
						fileName: "@nadithpro Assassin's Creed 2016 .mkv"
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'avengers':
				case 'the-avengers-2012':
				case 'avengers-age-of-ultron-2015':
				case 'avengers-infinity-war-2018':
				case 'avengers-endgame-2019': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/The_Avengers_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro The Avengers 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Avengers_Age_Of_Ultron_2015_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Avengers Age Of Ultron 2015 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Avengers_Infinity_War_2018_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Avengers Infinity War 2018 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/Avengers_Endgame_2019_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Avengers Endgame 2019 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'axl-2018':
				case 'axl': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_mv/AXL_2018_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro AXL 2018 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				




				default:

					if (isowner && body.startsWith('>')) {
						try {
							await reply(util.format(await eval(`(async () => {${body.slice(1)}})()`)))
						} catch (e) {
							await reply(util.format(e))
						}
					}

			}

		} catch (e) {
			const isError = String(e)

			console.log(isError)
		}
	})
}

connectToWA()

game 'gta5'
fx_version 'cerulean'

lua54 'yes'
use_experimental_fxv2_oal 'yes'

author 'codexis'
description 'Notification system for fivem'

ui_page 'web/build/index.html'

client_scripts {
    'config.lua',
    'client.lua',
}

server_scripts {
    'server.lua',
}

files {
	'web/build/index.html',
	'web/build/**/*',
}
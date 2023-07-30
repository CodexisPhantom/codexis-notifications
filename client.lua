local parameters = {
    volme = config.volume,
    useSoundJob = config.useSoundJob,
    useSoundSimple = config.useSoundSimple,
}

---@alias JobNotificationType 'opening' | 'information' | 'closing'
---@alias SimpleNotificationType 'success' | 'error' | 'info' | 'debug'

---@class SimpleNotification
---@field id? string
---@field message string
---@field type? SimpleNotificationType
---@field duration? number

---@class JobNotification
---@field id? string
---@field job string
---@field name string
---@field color string
---@field number? number
---@field message string
---@field type? JobNotificationType
---@field duration? number

--- Generate a unique id
---@credits Go to https://gist.github.com/jrus
local function GenerateId()
    return string.gsub('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', '[xy]', function(c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
end

--- Send message to the ui
---@param name string
---@param data any
local function SendReactMessage(name, data)
    SendNUIMessage({
        action = name,
        data = data
    })
end

--- Simple notification
---@param data SimpleNotification
function Notification(data)
    if not data.message then
        return
    end

    if not data.id then
        data.id = GenerateId()
    end

    if not data.type then
        data.type = 'success'
    end

    if not data.duration then
        data.duration = 5000
    end

    SendReactMessage('simpleNotification', data)
end
exports('Notification', Notification)

--- Job notification
---@param data JobNotification
function JobNotification(data)
    if not data.message or not data.job or not data.name or not data.color then
        return
    end

    if not data.id then
        data.id = GenerateId()
    end

    if not data.type then
        data.type = 'information'
    end

    if not data.duration then
        data.duration = 5000
    end

    SendReactMessage('jobNotification', data)
end
exports('JobNotification', JobNotification)

CreateThread(function()
    local value = nil

    value = GetResourceKvpString('codexis-notif')
    print(value)
    if value then
        volme = value
    end
end)

RegisterNUICallback('getConfig', function(_, cb)
    cb({
        volme = parameters.volme,
        useSoundJob = parameters.useSoundJob,
        useSoundSimple = parameters.useSoundSimple,
    })
end)

RegisterCommand('notifVolume', function(_, args, _)
    if tonumber(args[1]) > 0.0 and tonumber(args[1]) <= 1.0 then
        parameters.volme = tonumber(args[1])
        SetResourceKvp('codexis-notif', json.encode(parameters))
        Notification({
            id = 'cdx-applied-changes',
            message = config.translations[1],
            type = 'success',
            duration = 5000,
        })
    else
        Notification({
            id = 'cdx-applied-changes',
            message = config.translations[2],
            type = 'error',
            duration = 5000,
        })
    end
end, false)

RegisterCommand('notifSoundJob', function(_, args, _)
    if tonumber(args[1]) == 1 or tonumber(args[1]) == 0 then
        parameters.useSoundJob = tonumber(args[1])
        SetResourceKvp('codexis-notif', json.encode(parameters))
        Notification({
            id = 'cdx-applied-changes',
            message = config.translations[1],
            type = 'success',
            duration = 5000,
        })
    else
        Notification({
            id = 'cdx-applied-changes',
            message = config.translations[2],
            type = 'error',
            duration = 5000,
        })
    end
end, false)

RegisterCommand('notifSoundSimple', function(_, args, _)
    if tonumber(args[1]) == 1 or tonumber(args[1]) == 0 then
        parameters.useSoundSimple = tonumber(args[1])
        SetResourceKvp('codexis-notif', json.encode(parameters))
        Notification({
            id = 'cdx-applied-changes',
            message = config.translations[1],
            type = 'success',
            duration = 5000,
        })
    else
        Notification({
            id = 'cdx-applied-changes',
            message = config.translations[2],
            type = 'error',
            duration = 5000,
        })
    end
end, false)

TriggerEvent('chat:addSuggestion', '/notifVolume', 'Change notification volume', {
    { name = "volume", help = "between 0.1 and 1.0" },
})
TriggerEvent('chat:addSuggestion', '/notifSoundJob', 'Enable simple notification sound', {
    { name = "sound", help = "1 or 0" },
})
TriggerEvent('chat:addSuggestion', '/notifSoundSimple', 'Enable job notification sound', {
    { name = "sound", help = "1 or 0" },
})
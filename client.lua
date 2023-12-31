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

exports('Notification', Notification)
exports('JobNotification', JobNotification)

RegisterNetEvent('codexis-notifications:client:simple', Notification)
RegisterNetEvent('codexis-notifications:client:job', JobNotification)

RegisterNUICallback('getConfig', function(_, cb)
    cb({
        volme = config.volume,
        useSoundJob = config.useSoundJob,
        useSoundSimple = config.useSoundSimple,
    })
end)
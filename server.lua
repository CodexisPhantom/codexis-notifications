RegisterNetEvent('codexis-notifications:server:simple', function (data)
    local src = source
    TriggerClientEvent('codexis-notifications:client:simple', src, data)
end)

RegisterNetEvent('codexis-notifications:server:job', function (data)
    local src = source
    TriggerClientEvent('codexis-notifications:client:job', src, data)
end)

exports('Notification', function (source, data)
    TriggerClientEvent('codexis-notifications:client:simple', source, data)
end)
exports('JobNotification', function (source, data)
    TriggerClientEvent('codexis-notifications:client:job', source, data)
end)
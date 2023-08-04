# Preview
- Simple : https://streamable.com/5cj926
- Job: https://streamable.com/r82liv

# Informations
Simple notification system with two type of notifications :
- Simple notification
- Job notification

You will have to put your own image in the images folder for the job notification to work properly.

# Usage
- Simple notification
```lua
exports['codexis-notifications']:Notification({
   id = 'test', -- default is auto-generated
   message = 'Test notification', -- required
   type = 'success', -- default is success
   duration = 10000, -- default is 5000
})
```

- Job notification
```lua
exports['codexis-notifications']:JobNotification({
   id = 'test', -- default is auto-generated
   job = 'burgershot', -- required | This is the name of the image in web/build/images | require .png
   name = 'Burger Shot', -- required | This is the name of the job
   color = 'Burger Shot', -- required | Can be rgb or rgba or css color
   number = 'Burger Shot', -- not required | Can be rgb or rgba or css color
   message = '25% sale on all items', -- required
   type = 'information', -- default is information
   duration = 10000, -- default is 5000
})
```

# Snippets
- From qb-core to mine, change the function `QBCore.Functions.Notify` in qb-core/client/functions.lua with :
```lua
function QBCore.Functions.Notify(text, texttype, length)
    if type(text) == "table" then
        local ttext = text.text or 'Placeholder'
        exports['codexis-notifications']:Notification({
           message = ttext,
           type = texttype,
           duration = length,
        })
    else
        exports['codexis-notifications']:Notification({
           message = text,
           type = texttype,
           duration = length,
        })
    end
end
```
- From es_extended to mine, change the function `ESX.ShowNotification` in es_extended/client/functions.lua with :
```lua
function ESX.ShowNotification(message, type, length)
    if GetResourceState("codexis-notifications") ~= "missing" then
        return exports['codexis-notifications']:Notification({
           message = message,
           type = type,
           duration = length,
        })
    end
end
```

# Credits
Thanks to overextended for giving me some hints and better code practice when I watch their code

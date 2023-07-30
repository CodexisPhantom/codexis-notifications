# codexis-notifications
 Notification system for fivem

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

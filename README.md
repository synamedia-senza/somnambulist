# Somnambulist

_**noun.** a person who walks around or performs other motor acts while asleep; sleepwalker._

While watching TV, sometimes the viewer falls asleep, walks away... or both. To avoid consuming server resources while nobody is actually watching anything, after three hours of inactivity Senza will prepare to suspend the connection to the service. Before it does that, it will send a message to your app.

This app shows how you can listen for a `userinactivity` event and display an message to the user asking if they are still there. If they are, they can press any button on the remote to dismiss the message and keep watching. 

The app also shows how you can simulate this situation, so you don't have to wait three hours every time you want to test your app. Just press the back button (escape key) and after five seconds it will send a fake `userinactivity` message.

## Interface

* OK - toggle between foreground and background mode
* Escape - simulate a user inactivity message in 5 seconds
* Any button - dismiss the message


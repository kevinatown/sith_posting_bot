# Bot making with Botkit and Glitch

---

## Road Map
- Configuring Slack
- Glitch
- Botkit Basics
- Bot Hears
- Middleware

---

## Configuring Slack
- Basic Information
- Interactive Components
- OAuth & Permissions
- Event Subscriptions
- Bot User

--- 

### Basic Information

Show basic info about your app. You can set your app's icon here. But most importantly, we need the **Client Id** and **Client Secret** from App Credentials. These will go in the `.env` file on glitch.

---

### Interactive Components

**Interactivity** needs to be enabled and **Request URL** should be set to https://<your_glitch_location>.glitch.me/slack/receive

---

### OAuth & Permissions

**Scopes** need to be set. 

[Scopes](https://api.slack.com/docs/oauth-scopes) define the API methods this app is allowed to call, and thus which infomation and capabilities are available on a workspace it’s installed on. Many scopes are restricted to specific resources like channels or files.

---

### Event Subscriptions

**Events** need to be enabled. This allows you bot to be notified of events in Slack (for example, when a user adds a reaction or creates a file). 

**Request URL** should be set to: https://<your_glitch_location>.glitch.me/slack/receive

---

### Bot User

Set your bot's **Display name** and **Default username**

---

## Glitch

- NodeJs
- .env files
- remixing projects

---

## Botkit Basics

A javascript framework for building bots. Basically, it's an express webserver listening on `/slack/receive` for messages from slack and gets passed to Botkit. Most of the time text processing is done through the `.hears()` function, but the bot can also reply to a bunch of other [events](https://botkit.ai/docs/core.html).

---

## Bot Hears

An event trigger to have your bot listen for either regular expressions or straight text match.

- (incoming message events)[https://botkit.ai/docs/core.html]
- [bot.reply()](https://botkit.ai/docs/core.html#botreply)
- [bot.startConversation()](https://botkit.ai/docs/core.html#botstartconversation)

---

## Middleware

Botkit can get extended by [3rd party](https://botkit.ai/docs/readme-middlewares.html) or custom [middleware](https://botkit.ai/docs/middleware.html). 

- When receiving a message, before triggering any events
- When sending a message, before the message is sent to the API
- When hearing a message
- When matching patterns with hears(), after the pattern has been matched but before the handler function is called
- When capturing a users response to a convo.ask() question, after the user has answered, but before the value is stored or passed to the handler function

---


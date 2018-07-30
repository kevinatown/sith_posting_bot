## Bot making with Botkit and Glitch

---



---

### Configuring Slack
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

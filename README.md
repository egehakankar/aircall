## Summary

An application that manages previous inbox, outbox, missed, and archived calls. Written in **REACT.js**. Used **axios** library to send requests to the API's. 

The app has two different components:
- **Activity Feed** - simple list of calls
- **Activity Detail** - detail of a call
- **Archive** - archived calls. The user has the ability to archive and un-archive a call

The app consists two style libraries: 
- Material UI
- React Bootstrap

## Installation

```
yarn install
yarn start
```

## API documentation

### Routes

Here is the API address: https://aircall-job.herokuapp.com.

- **GET** - https://aircall-job.herokuapp.com/activities: get calls to display in the Activity Feed
- **GET** - https://aircall-job.herokuapp.com/activities/:id: retrieve a specific call details
- **POST** - https://aircall-job.herokuapp.com/activities/:id: update a call. 
- **GET** - https://aircall-job.herokuapp.com/reset: Reset all calls to initial state (usefull if you archived all calls).

### Call object

- **id** - unique ID of call
- **created_at** - creation date
- **direction** - `inbound` or `outbound` call
- **from** - caller's number
- **to** - callee's number
- **via** - Aircall number used for the call
- **duration** - duration of a call (in seconds)
- **is_archived** - call is archived or not
- **call_type** - can be a `missed`, `answered` or `voicemail` call.

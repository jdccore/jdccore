var API = {
    domain: "",
    room: "",
    displayName: "",
    parentNode: "",
    password: "",
    width: 500,
    height: 500,
    init: function (domain, room, displayName, parentNode, password, width, height) {
        API.domain = domain;
        API.room = room;
        API.displayName = displayName;
        API.parentNode = parentNode;
        API.password = password;
        API.width = width;
        API.height = height;
    },
    enterRoom: function () {
        const options = {
            roomName: API.room,
            width: API.width,
            height: API.height,
            parentNode: API.parentNode
        };
        const api = new JitsiMeetExternalAPI(API.domain, options);
        api.executeCommand("displayName", "");
        api.executeCommand("displayName", API.displayName);
        // set new password for channel
        api.addEventListener('participantRoleChanged', function (event) {
            if (event.role === 'moderator') {
                api.executeCommand('password', API.password);
            }
        });
        api.on('passwordRequired', function () {
            api.executeCommand('password', API.password);
        });


    }
}
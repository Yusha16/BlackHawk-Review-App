import md5 from 'md5';
export const defaultState = {
    users:[{
        id:"U1",
        name:"Dev",
        passwordHash:md5("TUPPLES"),
        friends:[`U2`],
        email: "",
        googleReviewURL: "",
        facebookReviewURL: "",
        emailTime: "09:00",
        waitTime: 48,
        numberOfTimes: 1
    },{
        id:"U2",
        name:"C. Eeyo",
        passwordHash:md5("PROFITING"),
        friends:[],
        email: "",
        googleReviewURL: "",
        facebookReviewURL: "",
        emailTime: "09:00",
        waitTime: 48,
        numberOfTimes: 1
    }]
}
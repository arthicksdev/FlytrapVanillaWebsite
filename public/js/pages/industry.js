//Initialize Components
//Plugin Configuration for FlyTrap News and Contact form
fly.init({
    //Replace appId: with your App Listing Key:
    appId: "4cba0af4a17f08d6a48db62a58b4d94d",
    debug: false,
    customUrl: "post",
    maxItems: 3,
    textColor: "#454545",
    showDescriptions: true,
    showImages: true,
}).then(function (res) {
    console.log("Successfully Loaded:", res);
    if (res) {
        fly.LoadNews("flynews");
        fly.LoadForm("flytrapcontact", "Real Estate", "Let's Talk",true);
    }
});
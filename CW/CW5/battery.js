(function () {
    let batteryLevel = document.getElementById("battery-level"),
        chargingStatus = document.getElementById("charging-status"),
        batteryCharged = document.getElementById("battery-charged"),
        batteryDischarged = document.getElementById("battery-discharged");

    let success = function (battery) {
        if (battery) {
            function setStatus () {
                console.log("Set status");
                batteryLevel.innerHTML = Math.round(battery.level * 100) + "%";
                chargingStatus.innerHTML = (battery.charging)? "" : "not ";
                batteryCharged.innerHTML = (battery.chargingTime == "Infinity")? "Infinity" : parseInt(battery.chargingTime / 60, 10);
                batteryDischarged.innerHTML = (battery.dischargingTime == "Infinity")? "Infinity" : parseInt(battery.dischargingTime / 60, 10);
            }

            setStatus();
            battery.addEventListener("levelchange", setStatus, false);
            battery.addEventListener("chargingchange", setStatus, false);
            battery.addEventListener("chargingtimechange", setStatus, false);
            battery.addEventListener("dischargingtimechange", setStatus, false);
        } 
    };


    navigator.getBattery()
        .then(success);
})();